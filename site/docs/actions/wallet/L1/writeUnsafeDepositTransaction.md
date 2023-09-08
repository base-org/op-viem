# writeUnsafeDepositTransaction

Excutes a [depositTransaction](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L374) call to the [`OptimismPortal`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) contract.

::: danger

Interacting directly the portal offers no replayability. For example, if you are sending ETH and your L2 transaction fails––because the gas limit is too low or something else goes wrong––your ETH will be in the `OptimismPortal` on L1 but you'll have nothing on L2: i.e. your ETH will be stuck indefinitely. You can read more about replays here and deposit transactions [here](https://community.optimism.io/docs/protocol/deposit-flow/#replaying-messages).

:::

::: warning

From Viem [writeContract]((https://viem.sh/docs/contract/writeContract.html#writecontract)), which this function uses internally.

> The `writeContract` internally sends a transaction – it **does not** validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `simulateContract`](#usage) before you execute it.

In this case, you can use [simulateSendMessage](/docs/actions/wallet/L1/simulateUnsafeDepositTransaction).

:::

::: code-group

```ts [example.ts]
import { DepositTransactionParameters } from 'op-viem'
import { base } from 'op-viem/chains'
import { account, l2PublicClient, opStackL1WalletClient } from './config'

const args: DepositTransactionParameters = {
  to: account,
  value: 1n,
  data: '0x',
  gasLimit: 0n,
  isCreation: false,
}

const gas = await l2PublicClient.estimateGas({
  account,
  to: args.to,
  value: args.value,
  data: args.data,
})

args.gasLimit = gas

const hash = await opStackL1WalletClient.writeUnsafeDepositTransaction({
  args,
  l2Chain: base,
  value: 1n,
})
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { base, mainnet } from 'op-viem/chains'
import { walletL1OpStackActions } from 'op-viem'

export const l2PublicClient = createPublicClient({
  chain: base,
  transport: http()
})

export const opStackL1WalletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletL1OpStackActions)

// JSON-RPC Account
export const [account] = await walletClient.getAddresses()
// Local Account
export const account = privateKeyToAccount(...)
```

:::

## Return Value

[`Hash`](https://viem.sh/docs/glossary/types#hash)

A [Transaction Hash](https://viem.sh/docs/glossary/terms#hash).

`writeContract` only returns a [Transaction Hash](https://viem.sh/docs/glossary/terms#hash). If you would like to retrieve the return data of a write function, you can use the [`simulateUnsafeDepositTransaction` action] – this action does not execute a transaction, and does not require gas.

## Parameters

### args

- #### to
  - **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)
  - The address the L2 transaction will be sent.

- #### gasLimit
  - **Type:** `bigint`
  - The gas limit of the L2 transaction

- #### value (optional)
  - **Type:** `bigint`
  - **Default:** `0`
  - The gas limit of the L2 transaction

- #### isCreation (optional)
  - **Type:** `boolean`
  - **Default:** `false`
  - Whether the L2 tx is creating a new contract

- #### data (optional)
  - **Type:** `Hex`
  - **Default:** `0x`
  - The calldata of the L2 transaction

```ts
await walletClient.writeUnsafeDepositTransaction({
  args: { // [!code focus:7]
    to: account.address,
    value: 1n,
    data: '0x',
    gasLimit: 21000n,
    isCreation: false,
  },
  l2Chain: base,
})
```

### l2Chain (optional)

- **Type:** `OpStackChain`

The destination L2 chain of the deposit transaction. `l2Chain.opStackConfig.l1.chainId` must match `chain.id` (from `client.chain` or `chain` passed explicitly as an arg). The address at `l2Chain.opStackConfig.l1.contracts.optimismPortal.address` will be used for the contract call. If this is argument not passed or if no such contract definition exists, [optimismPortalAddress](#optimismPortalAddress) must be passed explicitly.

```ts
await walletClient.writeUnsafeDepositTransaction({
  args,
  l2Chain: base, // [!code focus:1]
})
```

### optimismPortalAddress (optional)

- **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)

The `OptimismPortal` contract where the depositTransaction call should be made.

```ts
await walletClient.writeUnsafeDepositTransaction({
  args,
  optimismPortalAddress: portal, // [!code focus:1]
})
```

### value (optional)

- **Type:** `number`

Value in wei sent with this transaction. This value will be credited to the balance of the caller address on L2 _before_ the L2 transaction created by this transaction is made.

```ts
await walletClient.writeUnsafeDepositTransaction({
  args,
  optimismPortalAddress: portal,
  value: parseEther(1), // [!code focus:1]
})
```

::: tip
`account`, `accessList`, `chain`, `dataSuffix`, `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`, and `nonce` can all also be passed and behave as with any viem writeContract call. See [their documentation](https://viem.sh/docs/contract/writeContract.html#writecontract) for more details.
:::
