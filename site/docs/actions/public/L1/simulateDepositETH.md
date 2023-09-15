# simulateDepositETH

Simulates a deposit of ETH from L1 to L2.

::: code-group

```ts [example.ts]
import { base, publicL1Actions } from 'op-viem'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

const { request } = await publicClient.simulateDepositETH({
  args: {
    to: '0xFd4F24676eD4588928213F37B126B53c07186F45',
    minGasLimit: 100000n,
  },
  value: 1n,
  l2chain: base,
  account: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
})
```

:::

## Return Value

Returns a `request` that can be passed to Viem's `writeContract` and a `result` indicating whether the simulation succeeded.

## Parameters

### to

- **Type:** `Address`

The address to deposit the tokens to.

### minGasLimit

- **Type:** `bigint`

The minimum gas limit to use for the deposit transaction.

### value

- **Type:** `bigint`

The amount of ETH to deposit.

### l2chain

- **Type:** `OpStackChain`

The L2 chain to deposit to.

### account

- **Type:** `Address`

The address of the account to deposit from.