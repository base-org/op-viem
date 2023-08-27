import { Address, Chain, Hex, PublicClient, Transport, BlockTag } from 'viem'
import { Quantity, RpcBlockNumber } from 'viem/dist/types/types/rpc'

export type GetProofParameters = {
  address: Address
  storageKeys: Hex[]
  block: RpcBlockNumber | BlockTag
}

export type AccountProof = {
  address: Address
  accountProof: Hex[]
  balance: Quantity
  nonce: Quantity
  storageHash: Hex
  storageProof: StorageProof[]
}

export type StorageProof = {
  key: Hex
  value: Hex
  proof: Hex[]
}

export async function getProof<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { address, storageKeys, block }: GetProofParameters,
): Promise<AccountProof> {
  return await client.request<{
    Parameters: [Address, Hex[], RpcBlockNumber | BlockTag]
    ReturnType: AccountProof
  }>({ method: 'eth_getProof', params: [address, storageKeys, block] })
}
