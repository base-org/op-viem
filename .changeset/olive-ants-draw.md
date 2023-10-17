---
"op-viem": patch
---

Actions now receive contract addresses instead of L2 config objects for simplicty and Viem upstream compatibility. op-viem/chains now eexports addresses objects that be spread into actions to pass the required address.

Previously

```ts
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

Now

```ts
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
