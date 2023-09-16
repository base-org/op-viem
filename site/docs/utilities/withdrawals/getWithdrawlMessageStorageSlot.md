# getWithdrawalMessageStorageSlot

Utility for hashing a message hash. This computes the storage slot where the message hash will be stored in state. 0 is used because the first mapping in the contract is used.

## Usage

```ts
import { getWithdrawalMessageStorageSlot } from 'op-viem'

const hash =
  '0xB1C3824DEF40047847145E069BF467AA67E906611B9F5EF31515338DB0AABFA2'

getWithdrawalMessageStorageSlot(hash)
```

## Returns

`Hex`
