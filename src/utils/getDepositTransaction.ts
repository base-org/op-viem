import { type Hex } from 'viem'
import {
  type DepositTransaction,
  SourceHashDomain,
  type TransactionDepositedEvent,
} from '../types/depositTransaction.js'
import { parseOpaqueData } from './getArgsFromTransactionDepositedOpaqueData.js'
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
  const parsedOpaqueData = parseOpaqueData(event.args.opaqueData)
  const isSystemTransaction = false
  const to = parsedOpaqueData.isCreation === true ? '0x' : event.args.to

  return {
    sourceHash,
    from: event.args.from,
    to,
    mint: parsedOpaqueData.mint,
    value: parsedOpaqueData.value,
    gas: parsedOpaqueData.gas,
    isSystemTransaction,
    data: parsedOpaqueData.data,
  }
}
