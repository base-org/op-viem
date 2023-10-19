## DepositTransaction

A deposit transaction is a special type of transaction format specific to the OP Stack. It is for creating L2 transactions from [TransactionDepositedEvent](#transactiondepositedevent)s on L1. It is also used for [L1 info system transactions](https://github.com/ethereum-optimism/optimism/blob/develop/op-node/rollup/derive/l1_block_info.go#L35-L47). You can see the type [in the op-viem repo](https://github.com/base-org/op-viem/blob/f6595e8a0373f79e17b3c2c89f486091833e4d17/src/types/depositTransaction.ts#L20) and in [op-geth](https://github.com/ethereum-optimism/op-geth/blob/optimism/core/types/deposit_tx.go#L27-L44).

## MessagePassedEvent

An event declared in the [L2ToL1MessagePasser](https://github.com/ethereum-optimism/optimism/blob/adf55b3a60279e4750ab0682cb92d19921bbd92a/packages/contracts-bedrock/src/L2/L2ToL1MessagePasser.sol#L37) that is [emitted](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L2/L2ToL1MessagePasser.sol#L116-L124) when a [WithdrawTransaction](#withdrawtransaction) is initiated.

## OutputRootProof

A struct used in the [OptimismPortal](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) that represents a snapshot of L2 state. Defined in the [Types](https://github.com/ethereum-optimism/optimism/blob/adf55b3a60279e4750ab0682cb92d19921bbd92a/packages/contracts-bedrock/src/libraries/Types.sol#L25) library. Used in proving withdrawal transactions.

## SourceHash

SourceHash uniquely identifies the source of a deposit transaction and serves as a nonce. It is derived from the [SourceHashDomain](#sourcehashdomain), the log index (the index of the [TransactionDepositedEvent](#transactiondepositedevent) among all logs in the block), and the block hash of the L1 block in which the [TransactionDepositedEvent](#transactiondepositedevent) was emitted.

## SourceHashDomain

SourceHashDomain specifies whether the deposit transaction is from a deposit on L1 or is a system transaction. You can see the type [here](https://github.com/base-org/op-viem/blob/f6595e8a0373f79e17b3c2c89f486091833e4d17/src/types/depositTransaction.ts#L5-L8).

## TransactionDepositedEvent

An [event](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L73C1-L73C1) emitted from a [depositTransaction](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L377) call to the [OptimismPortal](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) contract, which is used to create a [DepositTransaction](#deposittransaction) on L2.

## Withdrawal

A withdrawal for an OP Stack chain is an L2 to L1 transaction where L2 state is created and can later be proven on L1. The withdrawal flow consists of three parts. First, there is the withdraw initiating transaction which the user submits on L2 and emits a [MessagePassedEvent](#messagepassedevent). Second, there is the withdrawal proving transaction which is submitted on L1 by the user to prove legitimacy of the withdrawal. This transaction emits a [WithdrawalProvenEvent](#withdrawalprovenevent). Lastly, there is the withdrawal finalizing transaction which is submitted on L1 by the user after the fault challenge period has passed which emits a [WithdrawalFinalizedEvent](#withdrawalfinalizedevent) and executes the transaction on L1.

## WithdrawalFinalizedEvent

An [event](https://github.com/ethereum-optimism/optimism/blob/f368843d5b5a730a6b144389cc39011fff3b0147/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L84) emitted from a [finalizeWithdrawalTransaction](https://github.com/ethereum-optimism/optimism/blob/f368843d5b5a730a6b144389cc39011fff3b0147/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L283) call to the [OptimismPortal](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) contract for a [WithdrawalTransaction](#withdrawtransaction).

## WithdrawalProvenEvent

An [event](https://github.com/ethereum-optimism/optimism/blob/f368843d5b5a730a6b144389cc39011fff3b0147/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L79) emitted from a [proveWithdrawalTransaction](https://github.com/ethereum-optimism/optimism/blob/f368843d5b5a730a6b144389cc39011fff3b0147/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L208) call to the [OptimismPortal](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) contract for a [WithdrawalTransaction](#withdrawtransaction).

## WithdrawalProof

A dynamic-length array of bytes used in proving transactions in the [OptimismPortal](https://github.com/ethereum-optimism/optimism/blob/adf55b3a60279e4750ab0682cb92d19921bbd92a/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L212). The proving transaction [must verify](https://github.com/ethereum-optimism/optimism/blob/adf55b3a60279e4750ab0682cb92d19921bbd92a/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L263) that this hash is contained in the L2ToL1MessagePasser's storage.

## RawOrContractAddress

```ts [example.ts]
export type ContractAddress<chainId = number> = {
  address: `0x${string}`
  chainId: chainId
  blockCreated: number
}
export type RawOrContractAddress<chainId> =
  | `0x${string}`
  | ContractAddress<chainId>
```

Either a raw address string or an annotated ContractAddress such as found in the chain addresses object.
