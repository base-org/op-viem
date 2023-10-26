# simulateDepositTransaction

Simulates a [depositTransaction](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L374) call to the [`OptimismPortal`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) contract.

::: code-group

```ts [example.ts]
import { DepositTransactionParameters } from 'op-viem'
import { baseAddresses } from 'op-viem/chains'
import { account, l2PublicClient, opStackL1PublicClient } from './config'

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

const { request, result } = await opStackL1PublicClient
  .simulateDepositTransaction({
    args,
    ...baseAddresses,
    value: 1n,
  })
```

```ts [config.ts]
import { createPublicClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { base } from 'op-viem/chains'
import { mainnet } from 'viem/chains'
import { publicL1OpStackActions } from 'op-viem'

export const l2PublicClient = createPublicClient({
  chain: base,
  transport: http()
})

export const opStackL1PublicClient = createPublicClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(publicL1OpStackActions)

// JSON-RPC Account
export const [account] = await walletClient.getAddresses()
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
  - The address the L2 transaction will be sent.

- #### gasLimit
  - **Type:** `bigint`
  - The gas limit of the L2 transaction

- #### value (optional)
  - **Type:** `bigint`
  - **Default:** `0`
  - Value in wei of the L2 transaction.

- #### isCreation (optional)
  - **Type:** `boolean`
  - **Default:** `false`
  - Whether the L2 tx is creating a new contract

- #### data (optional)
  - **Type:** `Hex`
  - **Default:** `0x`
  - The calldata of the L2 transaction

```ts
await publicClient.simulateDepositTransaction({
  args: { // [!code focus:7]
    to: account.address,
    value: 1n,
    data: '0x',
    gasLimit: 21000n,
    isCreation: false,
  },
  ...baseAddresses,
})
```

### portal

- **Type:** [`RawOrContractAddress`](https://opviem.sh/docs/glossary/types.html#raworcontractaddress)

The `OptimismPortal` contract where the depositTransaction call should be made.

```ts
await publicClient.writeDepositTransaction({
  args,
  portalAddress: portal, // [!code focus:1]
})
```

### value (optional)

- **Type:** `number`

Value in wei sent with this transaction. This value will be credited to the balance of the caller address on L2 _before_ the L2 transaction created by this transaction is made.

```ts
await publicClient.simulateDepositTransaction({
  args,
  portalAddress: portal,
  value: parseEther(1), // [!code focus:1]
})
```

::: tip
`account`, `accessList`, `chain`, `dataSuffix`, `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`, and `nonce` can all also be passed and behave as with any viem writeContract call. See [their documentation](https://viem.sh/docs/contract/writeContract.html#writecontract) for more details.
:::
