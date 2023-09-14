import type { Address, BlockTag, Chain, Hash, Hex, PublicClient, Transport } from 'viem'

export type GetProofParameters = {
  address: Address
  storageKeys: Hex[]
  block: Hex | BlockTag | Hash
}

export type AccountProof = {
  address: Address
  accountProof: Hex[]
  balance: Hex
  nonce: Hex
  storageHash: Hex
  storageProof: StorageProof[]
}

export type StorageProof = {
  key: Hex
  value: Hex
  proof: Hex[]
}

// NOTE(wilson): This should be suported in viem but isn't currently
export async function getProof<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { address, storageKeys, block }: GetProofParameters,
): Promise<AccountProof> {
  return await client.request<{
    Parameters: [Address, Hex[], Hex | BlockTag | Hash]
    ReturnType: AccountProof
  }>({ method: 'eth_getProof', params: [address, storageKeys, block] })
}
