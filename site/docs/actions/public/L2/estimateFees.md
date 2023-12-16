# estimateFees

Estimates gas for an L2 transaction including the L1 fee.

```ts
const feeValue = await estimateFees(publicClient, {
  abi,
  functionName: balanceOf,
  args: [address],
})
```

On non-OP chains, fees are usually by `GasUsed * GasPrice`, so the fee depends on the amount of computation required to execute the transaction. On OP chains this is `GasUsed * GasPrice + L1Fee`.

The L1 portion of the fee depends primarily on the _length_ of the transaction data and the current gas price on L1. The [Gas Price Oracle](https://docs.optimism.io/builders/tools/oracles#gas-oracle) is called to provide the L1 gas price and calculate the total L1 fee.

See also: [Transaction Fees on OP Mainnet](https://docs.optimism.io/stack/transactions/transaction-fees)
