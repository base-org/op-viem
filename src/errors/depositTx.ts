import { BaseError, Hash } from 'viem'

export class DepositTxNotFoundError extends BaseError {
  override name = 'TransactionNotFoundError'
  constructor({
    l1TxHash,
  }: {
    l1TxHash: Hash
  }) {
    super(`DepositTx in transaction with hash ${l1TxHash} could not be found.`)
  }
}
