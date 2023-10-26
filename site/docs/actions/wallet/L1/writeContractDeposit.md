# writeContractDeposit

Creates an L1 to L2 transaction by depositing into a contract on L2. This function serves as a specialized version of Viem's `writeContract`, adapted for L1 -> L2 transactions.

```ts [example.ts]
import { erc721ABI } from 'wagmi'
import { writeContractDeposit } from 'your-library'
import { walletClient } from 'your-library-client-setup'
import { baseAddresses } from 'your-library/chains'

const txHash = await writeContractDeposit(walletClient, {
  abi: erc721ABI,
  address: '0x6171f829e107f70b58d67594c6b62a7d3eb7f23b',
  functionName: 'approve',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 2048n],
  account: '0xYourAccountAddress',
  l2GasLimit: 100000n,
  ...baseAddresses,
})
```

## Return Value

Returns a transaction hash for the L2 transaction being initiated. The transaction hash conforms to Viem's [`WriteContractReturnType`](https://viem.sh/docs/glossary/types#writecontractreturntype).

## Parameters

### abi

- **Type:** `Abi | readonly unknown[]`

The ABI (Application Binary Interface) related to the contract.

### address

- **Type:** `Address`

The contract address on L2 that you are interacting with.

### functionName

- **Type:** `string`

The contract function name to call on L2.

### args

- **Type:** `Array`

The arguments to pass to the function. Must match the function signature.

### account

- **Type:** `Account | Address`

Account address initiating the L2 transaction. If not supplied, defaults to `client.account`.

### l2GasLimit

- **Type:** `bigint`

Gas limit for the L2 transaction.

### l2MsgValue (Optional)

- **Type:** `bigint`

The Ether value sent along with the L2 transaction. Defaults to `0n`.

### strict (Optional)

- **Type:** `boolean`

If set to `true`, throws an error when called from a smart contract account. Defaults to `true`.

### portal

- **Type:** [`RawOrContractAddress`](https://opviem.sh/docs/glossary/types.html#raworcontractaddress)

The `OptimismPortal` contract, or equivalent, facilitating the L1 to L2 transition.

## Notes

- The function will throw an error if `strict` is `true` and the `account` is a smart contract. This is to mitigate unexpected behavior due to [address aliasing](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#address-aliasing).

- The function uses `encodeFunctionData` to create calldata for the L2 transaction, thus requiring ABI, function name, and args.

- This function wraps around `writeDepositTransaction` and adds additional logic to cater to L2 transactions from L1.

## Errors

- Throws "No account found" if no `account` is supplied and none is set in the `client`.

- Throws a strict mode error when called from a smart contract account with `strict` set to `true`.
