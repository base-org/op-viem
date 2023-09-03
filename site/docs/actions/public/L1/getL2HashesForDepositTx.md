# getL2HashesForDepositTx

Get the L2 transaction hashes for a given L1 deposit transaction.

::: code-group

```ts [example.ts]
import { publicL1Actions } from "op-viem";
import { createPublicClient } from "viem";

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions);

const L2Hashes = await publicClient.getL2HashesForDepositTx({
  l1TxHash:
    "0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c",
});
```

:::
