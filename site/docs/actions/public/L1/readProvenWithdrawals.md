# readProvenWithdrawals

Returns a `ProvenWithdrawal` struct containing the `outputRoot`, `timestamp`, and `l2OutputIndex` for a given withdrawal hash. Returns error if withdrawal has not been proven.

```ts [example.ts]
import { publicL1Actions } from 'op-viem'
import { baseAddresses } from 'op-viem/chains'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

const provenWithdrawal = await readProvenWithdrawals(publicClient, {
  portal: baseAddresses.portal,
  withdrawalHash:
    '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
})
// or
const provenWithdrawal = await readProvenWithdrawals(publicClient, {
  ...baseAddresses,
  withdrawalHash:
    '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
})
```

## Return Value

Returns an object that represents a `ProvenWithdrawl` struct that contains the `outputRoot`, `timestamp`, and `l2OutputIndex`

```ts
type ProvenWithdrawal = {
  outputRoot: Hex
  timestamp: bigint
  l2OutputIndex: bigint
}
```

## Parameters

### portal

- **Type:** [`RawOrContractAddress`](https://opviem.sh/docs/glossary/types.html#raworcontractaddress)

The `OptimismPortal` contract where the sendMessage call should be made.

### withdrawalHash

- **Type:** `Hex`

The hash of the withdrawal
