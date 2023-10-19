# getSecondsToNextL2Output

Returns how long until the next L2 output, for a given chain, is posted on L1. This is useful when waiting to prove a withdrawal.

```ts [example.ts]
const l2Client = createPublicClient({
  chain: base,
  transport: http(),
})
const latestL2BlockNumber = await l2Client.getBlockNumber()

const l1Client = createPublicClient({
  chain: mainnet,
  transport: http(),
}).extend(publicL1OpStackActions)

const time = await l1Client.getSecondsToNextL2Output(, {
  latestL2BlockNumber,
  l2OutputOracle: baseAddresses.l2OutputOracle,
})
// Or
const time = await l1Client.getSecondsToNextL2Output(, {
  latestL2BlockNumber,
  ...baseAddresses,
})
```

## Return Value

`bigint`

Seconds until the next L2 output should be posted.

## Parameters

### latestL2BlockNumber

- **Type:** `bigint`

The latest L2 block number.

### l2OutputOracle

- **Type:** [`RawOrContractAddress`](https://viem.sh/docs/glossary/types#raworcontractaddress)

The address of the L2OutputOracle contract.
