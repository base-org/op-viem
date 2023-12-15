---
head:
  - - meta
    - property: og:title
      content: getProof
  - - meta
    - name: description
      content: Generates a proof of account state and storage for a specified Ethereum address at a given block.

---

# getProof

Generates a proof of account state and storage for a specified Ethereum address at a given block.

This function is crucial for verifying the state of an Ethereum account, particularly in applications dealing with cross-chain operations, such as withdrawals from Layer 2 to Layer 1 networks. It fetches proofs for given storage keys of an account at a specific block.

## Import

```ts
import { getProof } from './getProof.js';
```

## Usage

```ts
// Example usage in fetching account proof
import { getProof } from './getProof.js';
// Additional imports...

const proof = await getProof(client, {
  address: '0x...',
  storageKeys: ['0x...'],
  block: 'latest' // or a specific block number/hash
});
// Use the proof for further processing...
```

## Parameters

* `client`: An instance of PublicClient. Responsible for making the request to the Ethereum node.
* `GetProofParameters`: An object containing:
  * `address`: The Ethereum address for which to get the proof.
  * `storageKeys`: An array of storage keys (Hex) to fetch the storage proof.
  * `block`: The block number (Hex or BigInt), tag ('latest', 'earliest', 'pending'), or hash at which to fetch the proof.

## Returns

`AccountProof`: An object containing:

* `address`: The Ethereum address.
* `accountProof`: Array of hex strings forming the Merkle-Patricia proof of the account's existence and state.
* `balance`: Account's balance at the specified block.
* `nonce`: Account's nonce at the specified block.
* `storageHash`: Hash of the storage root.
* `storageProof`: Array of `StorageProof` objects for each requested storage key.

## Examples

### Retrieving Account Proof

```ts
// Example demonstrating fetching account proof for a specific address
const proof = await getProof(client, {
  address: '0x...',
  storageKeys: ['0x...'],
  block: 'latest'
});
console.log(proof);
```

### Usage in Withdrawal Process

```ts
// Example of using getProof in the context of proving a withdrawal
const proof = await getProof(client, {
  address: opStackL2ChainContracts.l2ToL1MessagePasser.address,
  storageKeys: [slot],
  block: toHex(block.number),
});
```

## Testing

`getProof` has a dedicated test to ensure its functionality and correctness. The test checks if the utility can correctly retrieve proofs for a given Ethereum address, storage keys, and block number.

### Test Overview

* **Test Name:** 'correctly retrieves proof'
* **Purpose:** To verify that getProof correctly fetches the storage proof for specified storage keys of an Ethereum address at a given block.
* **Test Methodology:**
  * A `PublicClient` is created with specific chain and transport settings.
  * The `getProof` function is called with a predefined address, storage keys, and block number.
  * The test asserts that the retrieved storage proof's value matches the expected result (`0x1`).

### Example Test Case


```ts
import { createPublicClient, http, toHex } from 'viem';
import { base } from 'viem/chains';
import { expect, test } from 'vitest';
import { getProof } from './getProof.js';

test('correctly retrieves proof', async () => {
  const client = createPublicClient({
    chain: base,
    transport: http(),
  });

  const result = await getProof(client, {
    address: '0x4200000000000000000000000000000000000016',
    storageKeys: ['0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99'],
    block: toHex(3155269n),
  });

  expect(result.storageProof[0].value).toEqual('0x1');
});
```
This test is crucial for ensuring the reliability of the getProof utility in real-world applications, particularly in scenarios requiring validation of blockchain state at a specific point in time.

## Notes

The function relies on the Ethereum node's support for the eth_getProof method.
It is used extensively in scenarios like validating withdrawal proofs from Layer 2 to Layer 1.
