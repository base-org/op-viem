# writeSendMessage

Excutes a [sendMessage](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/universal/CrossDomainMessenger.sol#L180) call to the [`L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/L1CrossDomainMessenger.sol) contract. This is a fairly low level function and generally it will be more convenient to use [`writeContractDeposit`](/docs/actions/wallet/L1/writeContractDeposit).

::: warning

From Viem [writeContract]((https://viem.sh/docs/contract/writeContract.html#writecontract)), which this function uses internally.

> The `writeContract` internally sends a transaction – it **does not** validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `simulateContract`](#usage) before you execute it.

In this case, you can use [simulateSendMessage](/docs/actions/wallet/L1/simulateSendMessage).

:::

::: code-group

```ts [example.ts]
import { SendMessageParameters } from 'op-viem'
import { base } from 'op-viem/chains'
import { account, opStackL1WalletClient } from './config'

const args: SendMessageParameters = {
  target: '0x00008453e27e8e88f305f13cf27c30d724fdd055',
  minGasLimit: 85000,
  message: '0x8c874ebd0021fb3f',
}

const hash = await opStackL1WalletClient.writeSendMessage({
  args,
  l2Chain: base,
  value: 1n,
})
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { walletL1OpStackActions } from 'op-viem'

export const opStackL1WalletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletL1OpStackActions)

// JSON-RPC Account
export const [account] = await walletClient.getAddresses()
// Local Account
export const account = privateKeyToAccount(...)
```

:::

## Return Value

[`Hash`](https://viem.sh/docs/glossary/types#hash)

A [Transaction Hash](https://viem.sh/docs/glossary/terms#hash).

`writeContract` only returns a [Transaction Hash](https://viem.sh/docs/glossary/terms#hash). If you would like to retrieve the return data of a write function, you can use the [`simulatSendMessage` action] – this action does not execute a transaction, and does not require gas.

## Parameters

### args

- #### target
  - **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)
  - The `to` address of the L2 transaction.

- #### minGasLimit
  - **Type:** `number`
  - The minimum gas limit for the L2 transaction. This will be padded to account for some overhead on the OPStack contract calls.

- #### message (optional)
  - **Type:** `Hex`
  - **Default:** `0x`
  - The calldata of the L2 transaction

```ts
await walletClient.writeSendMessage({
  args: { // [!code focus:4]
    target: '0x00008453e27e8e88f305f13cf27c30d724fdd055',
    minGasLimit: 85000,
    message: '0x8c874ebd0021fb3f',
  }
  l2Chain: base,
})
```

### l2Chain (optional)

- **Type:** `OpStackChain`

The destination L2 chain of the deposit transaction. `l2Chain.opStackConfig.l1.chainId` must match `chain.id` (from `client.chain` or `chain` passed explicitly as an arg). The address at `l2Chain.opStackConfig.l1.contracts.l1CrossDomainMessenger.address` will be used for the contract call. If this is argument not passed or if no such contract definition exists, [l1CrossDomainMessengerAddress](#l1CrossDomainMessengerAddress) must be passed explicitly.

```ts
await walletClient.writeSendMessage({
  args,
  l2Chain: base, // [!code focus:1]
})
```

### l1CrossDomainMessengerAddress (optional)

- **Type:** [`Address`](https://viem.sh/docs/glossary/types#address)

The `L1CrossDomainMessengerAddress` contract where the sendMessage call should be made.

```ts
await walletClient.writeSendMessage({
  args,
  l1CrossDomainMessengerAddress: messenger, // [!code focus:1]
})
```

### value (optional)

- **Type:** `number`

Value in wei sent with this transaction. This value will be credited to the balance of the caller address on L2 _before_ the L2 transaction created by this transaction is made.

```ts
await walletClient.writeDepositTransaction({
  args,
  optimismPortalAddress: portal,
  value: parseEther(1), // [!code focus:1]
})
```

::: tip
`account`, `accessList`, `chain`, `dataSuffix`, `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`, and `nonce` can all also be passed and behave as with any viem writeContract call. See [their documentation](https://viem.sh/docs/contract/writeContract.html#writecontract) for more details.
:::
