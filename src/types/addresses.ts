export type ContractAddress<chainId = number> = { address: `0x${string}`; chainId: chainId; blockCreated: number }
export type Addresses<chainId = number> = {
  optimismPortal: ContractAddress<chainId>
  l2OutputOracle: ContractAddress<chainId>
  l1StandardBridge: ContractAddress<chainId>
}

export type RawOrContractAddress<chainId> = `0x${string}` | ContractAddress<chainId>
