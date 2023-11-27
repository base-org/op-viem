## Deposit

::: code-group

```ts [index.ts]
import { baseGoerliAddresses } from 'op-viem/chains'
import {
  account,
  l1PublicClient,
  l1WalletClient,
  l2PublicClient,
} from './config'

const depositTxHash = await l1WalletClient.writeDepositETH({
  args: {
    to: account.address,
    // in this case sending to an EOA, better to use estimateGas
    minGasLimit: 21000,
  },
  value: 1n,
  ...baseGoerliAddresses,
})

const txReceipt = await l1PublicClient.waitForTransactionReceipt({
  hash: depositTxHash,
})

const l2Hashes = await l1PublicClient.getL2HashesForDepositTx({
  l1TxReceipt: txReceipt,
})

// wait for tx to land on L2

const l2TxReceipt = await l2PublicClient.waitForTransactionReceipt({
  hash: l2Hashes[0],
})
```

```ts [config.ts]
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseGoerli } from 'op-viem/chains'
import { goerli } from 'viem/chains'
import { walletL1OpStackActions, publicL1OpStackActions, publicL2OpStackActions } from 'op-viem'

// JSON-RPC Account
export const [account] = await walletClient.getAddresses()
// Local Account
export const account = privateKeyToAccount(...)

export const l1WalletClient = createWalletClient({
  chain: goerli,
  transport: http(),
  account
}).extend(walletL1OpStackActions)

export const l1PublicClient = createPublicClient({
  chain: goerli,
  transport: http()
}).extend(publicL1OpStackActions)

export const l2PublicClient = createPublicClient({
  chain: baseGoerli,
  transport: http()
}).extend(publicL2OpStackActions)
```

:::

## Withdrawal

::: code-group

```ts [index.ts]
import { baseGoerliAddresses } from 'op-viem/chains'
import {
  account,
  l1PublicClient,
  l1WalletClient,
  l2PublicClient,
  l2WalletClient,
} from './config'

const withdrawTxHash = await l2WalletClient.writeWithdrawETH({
  args: {
    to: account.address,
    amount: 1n,
    // in this case sending to an EOA, better to use estimateGas
    minGasLimit: 21000,
  },
})

const withdrawalReceipt = await l2PublicClient.waitForTransactionReceipt({
  hash: withdrawTxHash,
})

const withdrawalMessages = await l2PublicClient.getWithdrawalMessages({
  txReceipt: withdrawalReceipt,
})
const output = await l1PublicClient.getOutputForL2Block({
  l2BlockNumber: withdrawalMessages.blockNumber,
  ...baseGoerliAddresses,
})

const l2BlockNumber = await l2PublicClient.getBlockNumber()
const secondsToProve = await l1PublicClient.getSecondsToNextL2Output({
  ...baseGoerliAddresses,
  latestL2BlockNumber: l2BlockNumber,
})

// wait secondsToProve

const proveWithdrawalArgs = await l2PublicClient
  .getProveWithdrawalTransactionArgs({
    output,
    message: withdrawalMessages.messages[0],
  })

const proveWithdrawalTxHash = await l1WalletClient
  .writeProveWithdrawalTransaction({
    args: proveWithdrawalArgs,
    ...baseGoerliAddresses,
  })

await l1PublicClient.waitForTransactionReceipt({ hash: proveWithdrawalTxHash })

const provenWithdrawal = await l1PublicClient.readProvenWithdrawals({
  ...baseGoerliAddresses,
  withdrawalHash: withdrawalMessages.messages[0].withdrawalHash,
})
console.log('provenWithdrawal', provenWithdrawal)

const secondsToFinalize = await l1PublicClient.getSecondsToFinalizable({
  ...baseGoerliAddresses,
  withdrawalHash: withdrawalMessages.messages[0].withdrawalHash,
})

// wait secondToFinalize

const { withdrawalHash, ...withdrawal } = withdrawalMessages.messages[0]
const finalizeTxHash = await l1WalletClient.writeFinalizeWithdrawalTransaction({
  portal: baseGoerliAddresses.portal,
  args: { withdrawal },
  account,
})
console.log('finalizeTxHash', finalizeTxHash)
```

```ts [config.ts]
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseGoerli } from 'op-viem/chains'
import { goerli } from 'viem/chains'
import { walletL1OpStackActions, walletL2OpStackActions, publicL1OpStackActions, publicL2OpStackActions } from 'op-viem'

// JSON-RPC Account
export const [account] = await walletClient.getAddresses()
// Local Account
export const account = privateKeyToAccount(...)

export const l1WalletClient = createWalletClient({
  chain: goerli,
  transport: http(),
  account
}).extend(walletL1OpStackActions)

export const l2WalletClient = createWalletClient({
  chain: baseGoerli,
  transport: http(),
  account
}).extend(walletL2OpStackActions)

export const l1PublicClient = createPublicClient({
  chain: goerli,
  transport: http()
}).extend(publicL1OpStackActions)

export const l2PublicClient = createPublicClient({
  chain: baseGoerli,
  transport: http()
}).extend(publicL2OpStackActions)
```

:::
