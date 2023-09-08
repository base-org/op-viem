# getOutputForL2Block

Calls to the L2OutputOracle contract on L1 to get the output for a given L2 block.

::: code-group

```ts [example.ts]
import { publicL1Actions } from 'op-viem'
import { base } from 'op-viem/chains'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

await getOutputForL2Block(publicClient, {
  blockNumber: 2725977n,
  l2Chain: base,
})
```

:::
