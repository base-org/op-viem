import { type Hex, size, slice } from 'viem'
import {
  type DepositTransaction,
  SourceHashDomain,
  type TransactionDepositedEvent,
} from '../types/depositTransaction.js'
import { getSourceHash } from './getSourceHash.js'

export type GetDepositTransactionParams =
  & { event: TransactionDepositedEvent }
  & ({
    sourceHash: Hex
    logIndex?: never
    l1BlockHash?: never
    domain?: never
  } | {
    sourceHash?: never
    logIndex: number
    l1BlockHash: Hex
    domain?: SourceHashDomain
  })

export function getDepositTransaction({
  event,
  sourceHash,
  logIndex,
  l1BlockHash,
  domain = SourceHashDomain.UserDeposit,
}: GetDepositTransactionParams): DepositTransaction {
  sourceHash = sourceHash ?? getSourceHash({ domain, logIndex, l1BlockHash })
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
  const isCreation = BigInt(opaqueData[offset]) === 1n
  offset += 1
  const to = isCreation === true ? '0x' : event.args.to
  const data =
    // NOTE(Wilson): this is to deal with kind of odd behvior in slice
    // https://github.com/wagmi-dev/viem/blob/main/src/utils/data/slice.ts#L34
    offset > size(opaqueData) - 1
      ? '0x'
      : slice(opaqueData, offset, opaqueData.length)
  const isSystemTransaction = false

  return {
    sourceHash,
    from: event.args.from,
    to,
    mint: mint,
    value,
    gas,
    isSystemTransaction,
    data,
  }
}
