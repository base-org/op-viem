## DepositTransaction

A deposit transaction is a special type of transaction format specific to the OP Stack. It is for creating L2 transactions from [TransactionDepositedEvent](#transactiondepositedevent)s on L1. It is also used for [L1 info system transactions](https://github.com/ethereum-optimism/optimism/blob/develop/op-node/rollup/derive/l1_block_info.go#L35-L47). You can see the type [in the op-viem repo](https://github.com/base-org/op-viem/blob/f6595e8a0373f79e17b3c2c89f486091833e4d17/src/types/depositTransaction.ts#L20) and in [op-geth](https://github.com/ethereum-optimism/op-geth/blob/optimism/core/types/deposit_tx.go#L27-L44).

## TransactionDepositedEvent

An [event](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L73C1-L73C1) emitted from a [depositTransaction](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L374) call to the [OptimismPortal](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) contract, which is used to create a [DepositTransaction](#deposittransaction) on L2.

## SourceHash

SourceHash uniquely identifies the source of a deposit transaction and serves as a nonce. It is derived from the [SourceHashDomain](#sourcehashdomain), the log index (the index of the [TransactionDepositedEvent](#transactiondepositedevent) among all logs in the block), and the block hash of the L1 block in which the [TransactionDepositedEvent](#transactiondepositedevent) was emitted.

## SourceHashDomain

SourceHashDomain specifies whether the deposit transaction is from a deposit on L1 or is a system transaction. You can see the type [here](https://github.com/base-org/op-viem/blob/f6595e8a0373f79e17b3c2c89f486091833e4d17/src/types/depositTransaction.ts#L5-L8).
