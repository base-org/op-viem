import { concat, type Hex, keccak256, pad, toHex } from 'viem'
import { SourceHashDomain } from '../types/depositTransaction.js'

type GetSourceHashParams = {
  domain: SourceHashDomain
  logIndex: number
  l1BlockHash: Hex
}

/// from https://github.com/ethereum-optimism/optimism/blob/develop/packages/core-utils/src/optimism/deposit-transaction.ts#L117
/// with adaptions for viem
/// NOTE currently only supports user deposit txs, not L1InfoDeposit
export function getSourceHash({
  domain,
  logIndex,
  l1BlockHash,
}: GetSourceHashParams) {
  const marker = toHex(logIndex)
  const input = concat([l1BlockHash, pad(marker, { size: 32 })])
  const depositIDHash = keccak256(input)
  const domainHex = toHex(domain)
  const domainInput = concat([pad(domainHex, { size: 32 }), depositIDHash])
  return keccak256(domainInput)
}
