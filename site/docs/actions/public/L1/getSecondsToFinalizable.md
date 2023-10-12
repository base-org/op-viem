# getSecondsToFinalizable

Returns the number of seconds until a withdrawal is finalized for a given withdrawal hash. Will return 0 if seconds would be negative.

```ts [example.ts]
import { publicL1Actions } from 'op-viem'
import { baseAddresses } from 'op-viem/chains'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

const seconds = await getSecondsToFinalizable(publicClient, {
  optimismPortal: baseAddresses.optimismPortal,
  l2OutputOracle: baseAddresses.l2OutputOracle,
  withdrawalHash:
    '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
})

// or more simply
const seconds = await getSecondsToFinalizable(publicClient, {
  ...baseAddresses,
  withdrawalHash:
    '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
})
```

## Return Value

Returns a `number` representative of the seconds until withdrawal finalization.

## Parameters

### optimismPortal

- **Type:** [`RawOrContractAddress`](https://viem.sh/docs/glossary/types#raworcontractaddress)

The address of the `OptimismPortal` contract where the `readProvenWithdrawals` call will be made.

### l2OutputOracle

- **Type:** [`RawOrContractAddress`](https://viem.sh/docs/glossary/types#raworcontractaddress)

The address of the L2OutputOracle contract where the `FINALIZATION_PERIOD_SECONDS` call will be made.

### withdrawalHash

- **Type:** `Hex`

The hash of the withdrawal
