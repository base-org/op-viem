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

## Return Value

`bigint`

The fee in units of wei.

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
