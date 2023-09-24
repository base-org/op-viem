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

### optimismPortalAddress (optional)

- **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)

The address of the `OptimismPortal` contract where the `readProvenWithdrawals` call will be made. MUST be specified if [l2Chain](#l2chain-optional) not passed.

### l2OutputOracleAddress (optional)

- **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)

The address of the L2OutputOracle contract where the `FINALIZATION_PERIOD_SECONDS` call will be made. MUST be provied if [l2Chain](l2chain-optional) is not.

### withdrawalHash

- **Type:** `Hex`

The hash of the withdrawal
