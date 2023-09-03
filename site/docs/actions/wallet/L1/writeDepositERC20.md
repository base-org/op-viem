# writeDepositERC20

Writes a deposit of ERC20 tokens to L2.

::: code-group

```ts [example.ts]
import { base, publicL1Actions } from 'op-viem'
import { createWalletClient } from 'viem'

const USDCL1 = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const USDCL2 = '0x2e668bb88287675e34c8df82686dfd0b7f0c0383'

const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

const { request } = await walletClient.writeDepositERC20({
  args: {
    l1Token: USDCL1,
    l2Token: USDCL2,
    amount: 1n,
    gasLimit: 100000n,
  },
  toChain: base,
  account: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
})
```

:::
