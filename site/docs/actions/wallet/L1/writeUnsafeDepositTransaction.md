# writeUnsafeDepositTransaction

Excutes a depositTransaction call to the `OptimismPortal` contract.

::: danger

Interacting directly the portal offers no replay protection: if you are sending ETH and your L2 transaction fails--e.g. if the gas limit is too low--your ETH will be in the `OptimismPortal` but you'll have nothing on L2: i.e. your ETH will be stuck indefinitely.

:::

::: warning

[Viem recommends simulating tranasctions](https://viem.sh/docs/contract/writeContract.html#writecontract) before sending. In this case, you can use simulateWriteUnsafeTransaction.

:::

::: code-group

```ts [example.ts]
import { account, opStackL1WalletClient, l2PublicClient } from './config'
import { DepositTransactionParameters } from "op-viem";

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
  data: args.data
})

args.gasLimit = gas

const hash = await opStackL1WalletClient.writeUnsafeDepositTransaction({
  args,
  l2ChainId: base.id,
  value: 1n,
});
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

`writeContract` only returns a [Transaction Hash](https://viem.sh/docs/glossary/terms#hash). If you would like to retrieve the return data of a write function, you can use the [`simulateUnsafeDepositTransaction` action]() – this action does not execute a transaction, and does not require gas.

## Parameters

### args

- #### to 
  - **Type:** [`Address`](/docs/glossary/types#address)
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
    data: "0x",
    gasLimit: 21000n,
    isCreation: false,
  },
  l2ChainId: base.id,
});
```

### l2ChainId (optional)
- **Type:** `number`

The ID of the L2 chain the deposit transaction is intended for. This will be used to check for a known `OptimismPortal` address in the contract definitions of the chain where the deposit tx is originating (`chain.contracts.optimismPortal[l2ChainId]`). If no such definition exists, [optimismPortalAddress](#optimismPortalAddress) must be passed explicitly.

```ts
await walletClient.writeUnsafeDepositTransaction({
  args,
  l2ChainId: base.id, // [!code focus:1]
});
```

### optimismPortalAddress (optional)
- **Type:** [`Address`](/docs/glossary/types#address)

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
  value: parseEther(1) // [!code focus:1]
})
```


::: tip
`account`, `accessList`, `chain`, `dataSuffix`, `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`, and `nonce` can all also be passed and behave as with any viem writeContract call. See [their documentation](https://viem.sh/docs/contract/writeContract.html#writecontract) for more details. 
:::