# writeDepositETH

Writes a deposit of ETH from L1 to L2.

```ts [example.ts]
import { walletL1OpStackActions } from 'op-viem'
import { baseAddresses } from 'op-viem/chains'
import { createWalletClient } from 'viem'

const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
}).extend(walletL1OpStackActions)

const hash = await walletClient.writeDepositETH({
  args: {
    to: '0xFd4F24676eD4588928213F37B126B53c07186F45',
    gasLimit: 100000,
    amount: 1n,
  },
  ...baseAddresses,
  account: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
})
```

## Return Value

Returns a transaction hash of the deposit transaction.

## Parameters

### args

- #### to
  - **Type:** `Address`
  - The address to deposit the tokens to.

- #### gasLimit
  - **Type:** `number`
  - The minimum gas limit to use for the deposit transaction.

- #### amount
  - **Type:** `bigint`
  - The amount of ETH to deposit.

### portal

- **Type:** [`RawOrContractAddress`](https://opviem.sh/docs/glossary/types.html#raworcontractaddress)

The `OptimismPortal` contract.

### account

- **Type:** `Address`

The address of the account to deposit from.
