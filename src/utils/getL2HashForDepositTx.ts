import {
  Hex,
  decodeEventLog,
  slice,
  type PublicClient,
  toHex,
  keccak256,
  concat,
  pad,
  toRlp,
  toBytes,
  trim,
} from 'viem'
import { getDepositEventInfoFromTxReceipt } from './getDepositEventLogIndexFromTxReceipt'
import { SourceHashDomain } from '../types'
import { getSourceHash } from './getSourceHash'

const DEPOSIT_TX_PREFIX = '0x7E'

export async function getL2HashForDepositTx({
  l1TxHash,
  client,
  index,
}: { l1TxHash: Hex; client: PublicClient; index?: number }) {
  const receipt = await client.getTransactionReceipt({ hash: l1TxHash })
  var eventInfo = getDepositEventInfoFromTxReceipt(receipt, index)

  /// TODO consider throwing error
  if (!eventInfo) return

  const { event, logIndex } = eventInfo

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
  const length = opaqueData.length - offset
  const data = slice(opaqueData, offset, offset + length)
  const domain = SourceHashDomain.UserDeposit
  const l1BlockHash = receipt.blockHash

  const sourceHash = getSourceHash(domain, logIndex, l1BlockHash)

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
