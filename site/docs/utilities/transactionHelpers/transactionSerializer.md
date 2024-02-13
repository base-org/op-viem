---
head:
  - - meta
    - property: og:title
      content: transactionSerializer
  - - meta
    - name: description
      content: Add here.
---

# transactionSerializer

Serializes a transaction compliant with Ethereum Improvement Proposal (EIP) 1559.

This utility function takes transaction parameters and serializes them into a format compatible with EIP-1559, which introduced a new transaction type to Ethereum's fee market. It is essential for applications interacting with Ethereum's Layer 1 and Layer 2 solutions, particularly in scenarios where precise gas fee calculations and transaction structuring are required.

## Import

```ts
import { serializeEip1559Transaction } from './utils/transactionSerializer.js'
```

## Usage

```ts
// Example usage in an Ethereum transaction
import { serializeEip1559Transaction } from './utils/transactionSerializer.js'
// Additional imports...

const serializedTx = serializeEip1559Transaction({
  // Transaction parameters...
})
// Use serializedTx for further processing...
```

## Parameters

`options`: Combination of `EncodeFunctionDataParameters` and `TransactionSerializableEIP1559` (excluding `data`).

**Type:** Object
**Details:** Contains all the necessary parameters to encode function data and serialize the transaction.

## Returns

`TransactionSerializedEIP1559`

**Type:** Object
**Description:** The serialized transaction data, formatted according to EIP-1559 standards.
