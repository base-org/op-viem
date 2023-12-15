---
head:
  - - meta
    - property: og:title
      content: getL2HashFromL1DepositInfo
  - - meta
    - name: description
      content: Get the L2 transaction hash for a given L1 deposit transaction.
---

# getL2HashFromL1DepositInfo

Get the L2 transaction hash for a given L1 deposit transaction.

```ts [example.ts]
import { getL2HashFromL1DepositInfo, TransactionDepositedEvent } from 'op-viem'

const event: TransactionDepositedEvent = {
  eventName: 'TransactionDeposited',
  args: {
    from: '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
    to: '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
    version: 0n,
    opaqueData:
      '0x0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000001000000000000526c0000',
  },
}

const logIndex = 196
const blockHash =
  '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7'

const hash = getL2HashFromL1DepositInfo({
  event: event,
  logIndex: logIndex,
  l1BlockHash: blockHash,
})
```

## Returns

[`L2Hash`](/docs/glossary/types#l2hash)

## Parameters

### event

- **Type:** [`TransactionDepositedEvent`](/docs/glossary/types#transactiondepositedevent)

### logIndex

- **Type:** `number`

### l1BlockHash

- **Type:** `Hash`
