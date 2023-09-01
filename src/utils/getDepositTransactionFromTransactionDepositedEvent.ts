import { slice, size, Hex } from 'viem'
import {
  DepositTransaction,
  TransactionDepositedEvent,
} from '../types/depositTransaction'

export type GetDepositTransactionFromTransactionDepositedEventParams = {
  event: TransactionDepositedEvent
  sourceHash: Hex
}

export function getDepositTransactionFromTransactionDepositedEvent({
  event,
  sourceHash,
}: GetDepositTransactionFromTransactionDepositedEventParams): DepositTransaction {
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
