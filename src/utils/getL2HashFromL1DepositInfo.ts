import { type Hash, keccak256 } from 'viem'
import { type TransactionDepositedEvent } from '../types/depositTransaction.js'
import { getDepositTransaction } from './getDepositTransaction.js'
import { rlpEncodeDepositTransaction } from './rlpEncodeDepositTransaction.js'

type GetL2HashFromDepositInfoParams = {
  event: TransactionDepositedEvent
  logIndex: number
  blockHash: Hash
}

export function getL2HashFromL1DepositInfo({
  event,
  logIndex,
  blockHash,
}: GetL2HashFromDepositInfoParams) {
  const depositTx = getDepositTransaction({
    event,
    logIndex,
    l1BlockHash: blockHash,
  })

  return keccak256(rlpEncodeDepositTransaction(depositTx))
}
