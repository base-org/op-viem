# simulateDepositETH

Simulates a deposit of ETH from L1 to L2.

```ts [example.ts]
import { publicL1Actions } from 'op-viem'
import { baseAddresses } from 'op-viem/chains'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

const { request } = await publicClient.simulateDepositETH({
  args: {
    to: '0xFd4F24676eD4588928213F37B126B53c07186F45',
    gasLimit: 100000,
  },
  value: 1n,
  portal: baseAddresses.portal,
  account: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
})
```

## Return Value

Returns a `request` that can be passed to Viem's `writeContract` and a `result` indicating whether the simulation succeeded.

## Parameters

### args

- #### to
  - **Type:** `Address`
  - The address to deposit the tokens to.

- #### gasLimit
  - **Type:** `number`
  - The minimum gas limit to use for the deposit transaction.

### value

- **Type:** `bigint`

The amount of ETH to deposit.

### portal

- **Type:** [`RawOrContractAddress`](https://opviem.sh/docs/glossary/types.html#raworcontractaddress)

The `OptimismPortal` contract.

### account

- **Type:** `Address`

The address of the account to deposit from.
