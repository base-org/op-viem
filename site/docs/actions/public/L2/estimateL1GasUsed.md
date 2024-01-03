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

## Return Value

`bigint`

The estimated gas used.

## Parameters

### client

- **Type:** `PublicClient`

A client for the desired OP Stack chain.

### options

- **abi:** `Abi`

The ABI for the contract containing the function being estimated.

- **functionName:** `string`

The name of the function being estimated.

- **args:** `any[]`

The arguments to the function being estimated.

- **to (optional):** `Address`

Transaction recipient.

- **value (optional):** `bigint`

Value (in wei) sent with this transaction.

- **blockNumber (optional)**: `number`

The block number to perform the gas estimate against.

- **blockTag (optional):** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

**Default:** `'latest'`

The block tag to perform the gas estimate against.
