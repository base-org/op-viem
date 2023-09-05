import { Chain } from 'viem'
import { ChainContract } from 'viem'

export type OpStackL1Contract =
  | 'optimismL1CrossDomainMessenger'
  | 'optimismL1Erc721Bridge'
  | 'optimismL1StandardBridge'
  | 'optimismL2OutputOracle'
  | 'optimismPortal'

export type OpStackL2Contract =
  | 'optimismL2CrossDomainMessenger'
  | 'optimismL2StandardBridge'
  | 'optimismGasPriceOracle'
  | 'optimismL1Block'
  | 'optimismL2ToL1MessagePasser'
  | 'optimismL2Erc721Bridge'
  | 'optimismMintableErc721Factory'

export type OpStackChain = Chain & {
  contracts: OpStackL2ChainContracts
  optimismConfig: OptimismConfig
}

export type OptimismConfig = {
  l1: {
    chainId: number
    contracts: {
      [key in OpStackL1Contract]: ChainContract
    }
  }
}

export type OpStackL2ChainContracts = {
  optimismL2CrossDomainMessenger: ChainContract
  optimismL2StandardBridge: ChainContract
  optimismGasPriceOracle: ChainContract
  optimismL1Block: ChainContract
  optimismL2ToL1MessagePasser: ChainContract
  optimismL2Erc721Bridge: ChainContract
  optimismMintableErc721Factory: ChainContract
}

export const opStackL2ChainContracts: OpStackL2ChainContracts = {
  optimismL2CrossDomainMessenger: { address: '0x4200000000000000000000000000000000000007' },
  optimismL2StandardBridge: { address: '0x4200000000000000000000000000000000000010' },
  optimismGasPriceOracle: { address: '0x420000000000000000000000000000000000000F' },
  optimismL1Block: { address: '0x4200000000000000000000000000000000000015' },
  optimismL2ToL1MessagePasser: { address: '0x4200000000000000000000000000000000000016' },
  optimismL2Erc721Bridge: { address: '0x4200000000000000000000000000000000000014' },
  optimismMintableErc721Factory: { address: '0x4200000000000000000000000000000000000017' },
}
