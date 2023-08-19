import { BaseError, Hash } from 'viem'

export class DepositTxNotFoundError extends BaseError {
  override name = 'TransactionNotFoundError'
  constructor({
    l1TxHash,
    index,
  }: {
    l1TxHash: Hash
    index?: number
  }) {
    let identifier = `DepositTx in transaction with hash ${l1TxHash}`
    if (index !== undefined)
      identifier = `DepositTx in transaction with hash ${l1TxHash} at index ${index}`
    super(`${identifier} could not be found.`)
  }
}
