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

See also:

- [Transaction Fees on OP Mainnet](https://docs.optimism.io/stack/transactions/transaction-fees)
- [`estimateGas` from `viem`](https://viem.sh/docs/actions/public/estimateGas.html)

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

- **account:** `Account | Address`

The Account to estimate gas from.

- **to (optional):** `Address`

Transaction recipient.

- **value (optional):** `bigint`

Value (in wei) sent with this transaction.

- **blockNumber (optional)**: `number`

The block number to perform the gas estimate against.

- **blockTag (optional):** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

**Default:** `'latest'`

The block tag to perform the gas estimate against.

## JSON-RPC Methods

[`eth_estimateGas`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas)

