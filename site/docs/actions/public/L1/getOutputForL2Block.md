# getOutputForL2Block

Calls to the L2OutputOracle contract on L1 to get the output for a given L2 block.

```ts [example.ts]
import { publicL1Actions } from 'op-viem'
import { baseAddresses } from 'op-viem/chains'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

await getOutputForL2Block(publicClient, {
  blockNumber: 2725977n,
  l2OutputOracle: baseAddresses.l2OutputOracle,
})

// more simply
await getOutputForL2Block(publicClient, {
  blockNumber: 2725977n,
  ...baseAddresses,
})
```

## Return Value

Returns `GetOutputForL2BlockReturnType`.

```ts [example.ts]
export type Proposal = {
  outputRoot: Hex
  timestamp: bigint
  l2BlockNumber: bigint
}

export type GetOutputForL2BlockReturnType = {
  proposal: Proposal
  outputIndex: bigint
}
```

## Parameters

### blockNumber

- **Type:** `bigint`

The block number of the L2 block for which to get the output.

### l2OutputOracle

- **Type:** [`RawOrContractAddress`](https://viem.sh/docs/glossary/types#raworcontractaddress)

The address of the L2OutputOracle contract where the `getOutputForL2Block` call will be made.
