import { Hash, keccak256 } from 'viem'
import { TransactionDepositedEvent } from '../types/depositTransaction'
import { getDepositTransaction } from './getDepositTransaction'
import { rlpEncodeDepositTransaction } from './rlpEncodeDepositTransaction'

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
