# simulateFinalizeWithdrawalTransaction

Simulates a call to finalizeWithdrawalTranasction on the OptimismPortal contract.

```ts [example.ts]
import { publicL1Actions } from 'op-viem'
import { baseAddresses } from 'op-viem/chains'
import { createPublicClient } from 'viem'

const publicClient = createPublicClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicL1Actions)

const withdrawal: FinalizeWithdrawalTransactionParameters = {
  nonce:
    1766847064778384329583297500742918515827483896875618958121606201292641795n,
  sender: '0x02f086dBC384d69b3041BC738F0a8af5e49dA181',
  target: '0x02f086dBC384d69b3041BC738F0a8af5e49dA181',
  value: 335000000000000000000n,
  gasLimit: 100000n,
  data: '0x01',
}

const { request } = await publicClient.simulateFinalizeWithdrawalTransaction({
  ...baseAddresses,
  withdrawal,
  account: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
})
```

## Return Value

Returns a `request` that can be passed to Viem's `writeContract` and a `result` indicating whether the simulation succeeded.

## Parameters

### withdrawal

```ts
type FinalizeWithdrawalTransactionParameters = {
  nonce: bigint
  sender: `0x${string}`
  target: `0x${string}`
  value: bigint
  gasLimit: bigint
  data: `0x${string}`
}
```

### portal

- **Type:** [`RawOrContractAddress`](https://viem.sh/docs/glossary/types#raworcontractaddress)

The `OptimismPortal` contract.

### account

- **Type:** `Address`

The address of the account to use.
