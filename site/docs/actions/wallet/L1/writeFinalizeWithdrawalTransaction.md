# writeFinalizeWithdrawalTransaction

```ts
const withdrawal: FinalizeWithdrawalTransactionParameters = {
  nonce: 176684 7064778384329583297500742918515827483896875618958121606201292641795n,
  sender: '0x02f086dBC384d69b3041BC738F0a8af5e49dA181',
  target: '0x02f086dBC384d69b3041BC738F0a8af5e49dA181',
  value: 335000000000000000000n,
  gasLimit: 100000n,
  data: '0x01',
}

const hash = await opStackL1WalletClient.writeFinalizeWithdrawalTranasction({
  portal: baseAddresses.portal,
  withdrawal,
  account,
})
```

## Return Value

[`Hash`](https://viem.sh/docs/glossary/types#hash)

A [Transaction Hash](https://viem.sh/docs/glossary/terms#hash).

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

- **Type:** [`RawOrContractAddress`](https://opviem.sh/docs/glossary/types.html#raworcontractaddress)

The `OptimismPortal` contract.
