# writeWithdrawETH

Initiates an L2 -> L1 ETH transfer by calling [withdrawTo](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L2/L2StandardBridge.sol#L110) and the L2StandardBridge contract.

::: info
Beyond this transaction, completing a withdraw requires

1. Calling [writeProveWithdrawalTransaction](/docs/actions/wallet/L1/writeProveWithdrawalTransaction) after the state root including this transaction is written to L1
2. Calling [writeFinalizeWithdrawalTransaction] after the fault challenge period has elapsed.

Read [here](https://community.optimism.io/docs/developers/bridge/messaging/#for-op-mainnet-l2-to-ethereum-l1-transactions) for more details.

:::

::: warning

From Viem [writeContract]((https://viem.sh/docs/contract/writeContract.html#writecontract)), which this function uses internally.

> The `writeContract` internally sends a transaction – it **does not** validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `simulateContract`](#usage) before you execute it.

In this case, you can use [simulateWithdrawETH](/docs/actions/public/L2/simulateWithdrawETH).

:::

::: code-group

```ts [example.ts]
import { WithdrawETHParameters } from 'op-viem'
import { account, opStackL2WalletClient } from './config'

const args: WithdrawETHParameters = {
  to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  amount: 100n,
  minGasLimit: 85000,
  extraData: '0x123',
}

const hash = await opStackL2WalletClient.writeWithdrawETH({
  args,
  account,
})
```

```ts [config.ts]
import { walletL2OpStackActions } from 'op-viem'
import { base } from 'op-viem/chains'
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const opStackL2WalletClient = createWalletClient({
  chain: base,
  transport: custom(window.ethereum)
}).extend(walletL2OpStackActions)

// JSON-RPC Account
export const [account] = await walletClient.getAddresses()
// Local Account
export const account = privateKeyToAccount(...)
```

:::

## Return Value

[`Hash`](https://viem.sh/docs/glossary/types#hash)

A [Transaction Hash](https://viem.sh/docs/glossary/terms#hash).

`writeContract` only returns a [Transaction Hash](https://viem.sh/docs/glossary/terms#hash). If you would like to retrieve the return data of a write function, you can use the [simulateWithdrawETH](/docs/actions/public/L2/simulateWithdrawETH) action – this action does not execute a transaction, and does not require gas.

## Parameters

### args

- #### to
  - **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)
  - The `to` address of the L1 transaction.

- #### amount
  - **Type:** `bigint`
  - Value in wei to withdraw. This is the amount of ETH, specified in wei, that will leave the user's address on L2.

- #### minGasLimit
  - **Type:** `number`
  - The minimum gas limit for the L1 transaction.

- #### extraData (optional)
  - **Type:** `Hex`
  - **Default:** `0x`
  - The data of the L1 transaction

```ts
await opStackL2PublicClient.writeWithdrawETH({
  args: { // [!code focus:6]
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    amount: 100n,
    minGasLimit: 85000,
    extraData: '0x123',
  },
})
```

::: tip
`account`, `accessList`, `chain`, `dataSuffix`, `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`, and `nonce` can all also be passed and behave as with any viem writeContract call. See [their documentation](https://viem.sh/docs/contract/writeContract.html#writecontract) for more details.
:::
