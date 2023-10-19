import { type Address } from 'viem'

export type ContractAddress<chainId = number> = { address: Address; chainId: chainId; blockCreated?: number }
export type Addresses<chainId = number> = {
  portal: ContractAddress<chainId>
  l2OutputOracle: ContractAddress<chainId>
  l1StandardBridge: ContractAddress<chainId>
  l1CrossDomainMessenger: ContractAddress<chainId>
  l1Erc721Bridge: ContractAddress<chainId>
}

export type RawOrContractAddress<chainId> = Address | ContractAddress<chainId>

export function resolveAddress(address: RawOrContractAddress<number>): `0x${string}` {
  if (typeof address !== 'string' && !address?.address) throw new Error('Invalid address')
  return typeof address === 'string' ? address : address.address
}
