export type ContractAddress<chainId = number>  = { address: `0x${string}`; chainId: chainId; blockCreated: number }
export type Addresses = {
  optimismPortal: ContractAddress,
  l2OutputOracle: ContractAddress,
}

export type RawOrContractAddress<chainId> =  `0x${string}` | ContractAddress<chainId>