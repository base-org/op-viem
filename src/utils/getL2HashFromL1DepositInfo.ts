import { Hash, concat, keccak256, size, slice, toRlp, trim } from 'viem'
import {
  DEPOSIT_TX_PREFIX,
  SourceHashDomain,
  TransactionDepositedEvent,
} from '../types/depositTx'
import { getSourceHash } from './getSourceHash'

type GetL2HashFromDepositInfo = {
  event: TransactionDepositedEvent
  logIndex: number
  blockHash: Hash
}

export function getL2HashFromL1DepositInfo({
  event,
  logIndex,
  blockHash,
}: GetL2HashFromDepositInfo) {
  /// code from https://github.com/ethereum-optimism/optimism/blob/develop/packages/core-utils/src/optimism/deposit-transaction.ts#L198
  /// with adaptions for viem
  const opaqueData = event.args.opaqueData
  let offset = 0
  const mint = slice(opaqueData, offset, offset + 32)
  offset += 32
  const value = slice(opaqueData, offset, offset + 32)
  offset += 32
  const gas = slice(opaqueData, offset, offset + 8)
  offset += 8
  const isCreation = BigInt(opaqueData[offset]) == 1n
  offset += 1
  const to = isCreation === true ? '0x' : event.args.to
  const data =
    offset > size(opaqueData) - 1
      ? '0x'
      : slice(opaqueData, offset, opaqueData.length)
  const domain = SourceHashDomain.UserDeposit
  const l1BlockHash = blockHash

  const sourceHash = getSourceHash({ domain, logIndex, l1BlockHash })

  const rlp = toRlp([
    sourceHash,
    event.args.from,
    to,
    trim(mint),
    trim(value),
    trim(gas),
    '0x', // for isSystemTransaction
    data,
  ])

  return keccak256(concat([DEPOSIT_TX_PREFIX, rlp]))
}
