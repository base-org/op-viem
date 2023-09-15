# simulateDepositERC20

Simulates a deposit of ERC20 tokens to L2.

::: code-group

```ts [example.ts]
import { base, publicL1Actions } from 'op-viem'
import { createPublicClient } from 'viem'

const USDCL1 = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const USDCL2 = '0x2e668bb88287675e34c8df82686dfd0b7f0c0383'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

const { request } = await publicClient.simulateDepositERC20({
  args: {
    l1Token: USDCL1,
    l2Token: USDCL2,
    to: '0xFd4F24676eD4588928213F37B126B53c07186F45',
    amount: 1n,
    minGasLimit: 100000n,
  },
  l2chain: base,
  account: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
})
```

:::

## Return Value

Returns a `request` that can be passed to Viem's `writeContract` and a `result` indicating whether the simulation succeeded.

## Parameters

### l1Token

- **Type:** `Address`

The L1 token contract address.

### l2Token

- **Type:** `Address`

The L2 token contract address.

### to

- **Type:** `Address`

The address to deposit the tokens to.

### amount

- **Type:** `bigint`

The amount of tokens to deposit.

### gasLimit

- **Type:** `bigint`

The gas limit for the transaction.

### extraData (optional)

- **Type:** `data`

Extra data to include in the transaction.

### l2chain

- **Type:** `OpStackChain`

The L2 chain to deposit to.

### account

- **Type:** `Address`

The address to deposit the tokens from.