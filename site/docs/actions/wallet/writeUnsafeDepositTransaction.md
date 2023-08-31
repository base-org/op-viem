# writeUnsafeWalletDeposit

Excutes a depositTransaction call to the OptimalPortal contract.

::: warning

Interacting directly the portal offers no replay protection: if you are sending ETH and your L2 transaction fails, your ETH will be stuck in the contract forever.

:::

::: code-group

```ts [example.ts]
import { walletClient } from "viem";
import { writeUnsafeDepositTransaction } from "op-viem";

const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(walletOpStackActions);

const depositHash = await walletClient.writeUnsafeDepositTransaction({
  toChain: base,
  args: {
    to: account.address,
    value: 1n,
    data: "0x",
    gasLimit: 25000n,
    isCreation: false,
  },
  value: 1n,
});
```

:::
