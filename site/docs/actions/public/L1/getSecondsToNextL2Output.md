# getSecondsToNextL2Output

Returns how long until the next L2 output, for a given chain, is posted on L1. This is useful when waiting to prove a withdrawal.

::: code-group

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
  l2Chain: base,
})
```

:::

## Return Value

`bigint`

Seconds until the next L2 output should be posted.

## Parameters

### l2Chain (optional)

- **Type:** `OpStackChain`

The L2 chain that we are waiting on the output of.

### l2OutputOracleAddress (optional)

- **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)

The address of the L2OutputOracle contract. MUST be provied if [l2Chain](l2chain-optional) is not.
