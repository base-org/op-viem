# simulateWithdawETH

Simulates a [writeWithdrawETH](/docs/actions/wallet/L2/writeWithdrawETH) transaction.

::: code-group

```ts [example.ts]
import { WithdrawETHParameters } from 'op-viem'
import { account, opStackL2PublicClient } from './config'

const args: WithdrawETHParameters = {
  to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  amount: 100n,
  minGasLimit: 85000,
  extraData: '0x123',
}

const hash = await opStackL2PublicClient.simulateWithdrawETH({
  args,
  account,
})
```

```ts [config.ts]
import { publicL2OpStackActions } from 'op-viem'
import { base } from 'op-viem/chains'
import { createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const opStackL2PublicClient = createPublicClient({
  chain: base,
  transport: http(),
}).extend(publicL2OpStackActions)

// JSON-RPC Account
export const [account] = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// Local Account
export const account = privateKeyToAccount(...)
```

:::

## Return Value

The simulation result and write request. Type is inferred.

## Parameters

### args

- #### to
  - **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)
  - The `to` address of the L1 transaction. The L1 address to withdraw the ETH to.

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
await opStackL2PublicClient.simulateWithdrawETH({
  args: { // [!code focus:6]
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    amount: 100n,
    minGasLimit: 85000,
    extraData: '0x123',
  },
})
```

::: tip
`account`, `accessList`, `dataSuffix`, `gas`, `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`, `nonce`, `blockNumber`, and `blockTag` can all also be passed and behave as with any viem simulateContract call. See [their documentation](https://viem.sh/docs/contract/simulateContract.html#simulatecontract) for more details.
:::
