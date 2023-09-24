import { type Hex, size, slice } from 'viem'
import type { TransactionDepositedEvent } from '../index.js'

export type ParsedTransactionDepositedOpaqueData = {
  // TODO(Wilson): consider using mint in writeDepositContract is it is more
  // clear that this is the value that will be minted on L2
  // this type could then maybe be called DepositTransactionArgs, though it would have this
  // additional mint field, when compared to the contract
  mint: Hex
  value: Hex
  gas: Hex
  isCreation: boolean
  data: Hex
}

/**
 * @description Returns the TransactionDeposited event and log index, if found,
 * from the transaction receipt
 *
 * @param {opaqueData} opaqueData from the TransactionDepositedEvent event args
 * @returns {ParsedTransactionDepositedOpaqueData} The data parsed into five fields
 */
export function parseOpaqueData(
  opaqueData: TransactionDepositedEvent['args']['opaqueData'],
): ParsedTransactionDepositedOpaqueData {
  let offset = 0
  const mint = slice(opaqueData, offset, offset + 32)
  offset += 32
  const value = slice(opaqueData, offset, offset + 32)
  offset += 32
  const gas = slice(opaqueData, offset, offset + 8)
  offset += 8
  const isCreation = BigInt(opaqueData[offset]) === 1n
  offset += 1
  const data =
    // NOTE(Wilson): this is to deal with kind of odd behvior in slice
    // https://github.com/wagmi-dev/viem/blob/main/src/utils/data/slice.ts#L34
    offset > size(opaqueData) - 1
      ? '0x'
      : slice(opaqueData, offset, opaqueData.length)
  return {
    mint,
    value,
    gas,
    isCreation,
    data,
  }
}
