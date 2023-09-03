# writeUnsafeWalletDeposit

Excutes a depositTransaction call to the OptimalPortal contract.

::: warning

Interacting directly the portal offers no replay protection: if you are sending ETH and your L2 transaction fails--e.g. if the gas limit is too low--your ETH will be in the OptimismPortal but you'll have nothing on L2: i.e. your ETH will be stuck indefinitely.

:::

::: warning

[Viem recommends simulating tranasctions](https://viem.sh/docs/contract/writeContract.html#writecontract) before sending. In this case, you can use simulateWriteUnsafeTransaction

:::

::: code-group

```ts [example.ts]
import { account } from './config'
import { createWalletClient, createPublicClient } from "viem";
import { walletL1OpStackActions } from "op-viem";
import { base } from 'viem/chains'
import { mainnet, DepositTransactionParameters } from "op-viem/chains";

const l2PublicClient = createPublicClient({
  chain: base,
  transport: http(),
})

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

const depositHash = await walletClient.writeUnsafeDepositTransaction({
  args,
  l2ChainId: base.id,
  value: 1n,
})

const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(walletL1Actions);

const hash = await walletClient.writeUnsafeDepositTransaction({
  toChain: base,
  args,
  value: 1n,
});
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
  toChain: base,
  args: { // [!code focus:7]
    to: account.address,
    value: 1n,
    data: "0x",
    gasLimit: 21000n,
    isCreation: false,
  },
  value: 1n,
});
```
