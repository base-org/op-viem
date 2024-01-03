---
head:
  - - meta
    - property: og:title
      content: getArgsFromTransactionDepositedOpaqueData
  - - meta
    - name: description
      content: Parses the opaque data from the `TransactionDepositedEvent` event args, extracting and structuring key transaction data.
---

# getArgsFromTransactionDepositedOpaqueData

Parses the opaque data from the `TransactionDepositedEvent` event args, returning structured transaction data.

This function is a key component in the `getDepositTransaction` process, where it extracts and formats fields like `mint`, `value`, `gas`, `isCreation`, and `data` from the opaque data. These fields are then used to construct a `DepositTransaction` object.

## Import

```ts
import { parseOpaqueData } from './utils/getArgsFromTransactionDepositedOpaqueData.js';
```

## Usage

```ts
import { parseOpaqueData } from './utils/getArgsFromTransactionDepositedOpaqueData.js';

// ... within getDepositTransaction function
const parsedOpaqueData = parseOpaqueData(event.args.opaqueData);
// Use parsedOpaqueData to construct DepositTransaction
```

## Returns

`ParsedTransactionDepositedOpaqueData`

Returns an object containing structured transaction data with fields such as mint, value, gas, isCreation, and data.

## Parameters

`opaqueData`

**Type:** Hex
**Description:** The opaque data from the TransactionDepositedEvent event args.