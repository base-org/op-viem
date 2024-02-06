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
import { getProof } from './getProof.js'
```

## Usage

This example, adapted from `getProof.test.js`, demonstrates fetching an account's state and storage proof for a specific Ethereum address at a given block. It illustrates a practical application of the `getProof` function.

```ts
import { createPublicClient, http, toHex } from 'viem';
import { base } from 'viem/chains';
import { getProof } from './getProof.js'

// Setting up the client with base chain and HTTP transport
const client = createPublicClient({
  chain: base,
  transport: http(),
});

// Example usage of getProof to fetch account state and storage proof
const result = await getProof(client, {
  address: '0x4200000000000000000000000000000000000016', // Ethereum address
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99', // Storage key
  ],
  block: toHex(3155269n), // Block number in hexadecimal
});

// The result contains the storage proof for the specified address and block
```

This approach not only provides a clear, practical example of how to use `getProof` but also shows the function in action in a scenario similar to what users might encounter in their own applications.

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