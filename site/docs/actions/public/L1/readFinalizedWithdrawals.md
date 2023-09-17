# readFinalizedWithdrawals

Returns a boolean for whether the withdrawal of a given withdrawl hash has been finalized.

::: code-group

```ts [example.ts]
import { publicL1Actions } from 'op-viem'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
    account,
    chain: mainnet,
    transport: http(),
}).extend(publicL1Actions)

const finalizedWithdrawal = await readFinalizedWithdrawals(publicClient, {
    l2Chain: base,
    withdrawalHash: '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
})
```

:::

## Return Value

Returns a `boolean` for whether the withdrawal has been finalized.

## Parameters

### l2chain

- **Type:** `OpStackChain`

The L2 chain to deposit to.

### withdrawalHash

- **Type:** `0x{string}`

The hash of the withdrawal
