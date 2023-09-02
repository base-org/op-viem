import { Hash, keccak256 } from 'viem'
import {
  SourceHashDomain,
  TransactionDepositedEvent,
} from '../types/depositTransaction'
import { getSourceHash } from './getSourceHash'
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
  const sourceHash = getSourceHash({
    domain: SourceHashDomain.UserDeposit,
    logIndex,
    l1BlockHash: blockHash,
  })
  const depositTx = getDepositTransaction({
    event,
    sourceHash,
  })

  const rlp = rlpEncodeDepositTransaction(depositTx)

  return keccak256(rlp)
}
