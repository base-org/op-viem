# estimateL1GasUsed

Returns the L1 gas used for the specified transaction.

```ts
const L1GasUsedValue = await estimateL1GasUsed(data, {
  abi,
  functionName: balanceOf,
  args: [address],
})
```

The [Gas Price Oracle](https://docs.optimism.io/builders/tools/oracles#gas-oracle) is called to calculate the gas that will be necessary to publish the given transaction to L1.
