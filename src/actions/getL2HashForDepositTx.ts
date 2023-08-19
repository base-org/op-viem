import {
  slice,
  type PublicClient,
  keccak256,
  concat,
  toRlp,
  trim,
  Chain,
  Transport,
  Hash,
} from 'viem'
import { getDepositEventInfoFromTxReceipt } from '../utils/getDepositEventLogIndexFromTxReceipt'
import { DEPOSIT_TX_PREFIX, SourceHashDomain } from '../types/depositTx'
import { getSourceHash } from '../utils/getSourceHash'
import { DepositTxNotFoundError } from '../errors/depositTx'

export type GetL2HashForDepositTxParamters = {
  l1TxHash: Hash
  index?: number
}

export type GetL2HashForDepositTxReturnType = Hash

export async function getL2HashForDepositTx<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { l1TxHash, index }: GetL2HashForDepositTxParamters,
): Promise<GetL2HashForDepositTxReturnType> {
  const receipt = await client.getTransactionReceipt({ hash: l1TxHash })
  var eventInfo = getDepositEventInfoFromTxReceipt(receipt, index)

  /// TODO consider throwing error
  if (!eventInfo) {
    throw new DepositTxNotFoundError({ l1TxHash, index })
  }

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
