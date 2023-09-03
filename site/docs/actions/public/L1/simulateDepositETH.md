# simulateDepositETH

Simulates a deposit of ETH to L2.

::: code-group

```ts [example.ts]
import { base, publicL1Actions } from "op-viem";
import { createPublicClient } from "viem";

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions);

const { request } = await publicClient.simulateDepositETH({
  args: {
    gasLimit: 100000n,
  },
  value: 1n,
  toChain: base,
  account: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
});
```

:::
