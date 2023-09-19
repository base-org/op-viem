# getSecondsToFinalizable

Returns the number of seconds until a withdrawal is finalized for a given withdrawal hash. Will return 0 if seconds would be negative.

```ts [example.ts]
import { publicL1Actions } from 'op-viem'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

const seconds = await getSecondsToFinalizable(publicClient, {
  l2Chain: base,
  withdrawalHash:
    '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
})
```

## Return Value

Returns a `number` representative of the seconds until withdrawal finalization.

## Parameters

### l2chain (optional)

- **Type:** `OpStackChain`

The L2 chain to deposit to.

### withdrawalHash

- **Type:** `0x{string}`

The hash of the withdrawal
