# writeDepositETH

Writes a deposit of ETH from L1 to L2.

::: code-group

```ts [example.ts]
import { base, walletL1OpStackActions } from 'op-viem'
import { createWalletClient } from 'viem'

const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
}).extend(walletL1OpStackActions)

const hash = await walletClient.writeDepositETH({
  args: {
    to: '0xFd4F24676eD4588928213F37B126B53c07186F45',
    minGasLimit: 100000,
  },
  value: 1n,
  l2chain: base,
  account: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
})
```

:::

## Return Value

Returns a transaction hash of the deposit transaction.

## Parameters

### to

- **Type:** `Address`

The address to deposit the tokens to.

### minGasLimit

- **Type:** `number`

The minimum gas limit to use for the deposit transaction.

### value

- **Type:** `bigint`

The amount of ETH to deposit.

### l2chain

- **Type:** `OpStackChain`

The L2 chain to deposit to.

### account

- **Type:** `Address`

The address of the account to deposit from.
