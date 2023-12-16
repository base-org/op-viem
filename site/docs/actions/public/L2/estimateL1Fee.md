# estimateL1Fee

Computes the L1 portion of the fee based on the size of the RLP-encoded input transaction, the current L1 base fee, and the various dynamic parameters.

```ts
const L1FeeValue = await estimateL1Fee(publicClient, {
  abi,
  functionName: balanceOf,
  args: [address],
})
```

The L1 portion of the fee depends primarily on the _length_ of the transaction data and the current gas price on L1. The [Gas Price Oracle](https://docs.optimism.io/builders/tools/oracles#gas-oracle) is called to provide the L1 gas price and calculate the total L1 fee.

See also: [Transaction Fees on OP Mainnet](https://docs.optimism.io/stack/transactions/transaction-fees)
