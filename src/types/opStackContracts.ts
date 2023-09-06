import { Chain } from 'viem'
import { ChainContract } from 'viem'

export enum OpStackL1Contract {
  OptimismL1CrossDomainMessenger = 'optimismL1CrossDomainMessenger',
  OptimismL1Erc721Bridge = 'optimismL1Erc721Bridge',
  OptimismL1StandardBridge = 'optimismL1StandardBridge',
  OptimismL2OutputOracle = 'optimismL2OutputOracle',
  OptimismPortal = 'optimismPortal',
}

enum OpStackL2Contract {
  OptimismL2CrossDomainMessenger = 'optimismL2CrossDomainMessenger',
  OptimismL2StandardBridge = 'optimismL2StandardBridge',
  OptimismGasPriceOracle = 'optimismGasPriceOracle',
  OptimismL1Block = 'optimismL1Block',
  OptimismL2ToL1MessagePasser = 'optimismL2ToL1MessagePasser',
  OptimismL2Erc721Bridge = 'optimismL2Erc721Bridge',
  OptimismMintableErc721Factory = 'optimismMintableErc721Factory',
}

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

export type OpStackL2ChainContracts = { [key in OpStackL2Contract]: ChainContract }

export const opStackL2ChainContracts: OpStackL2ChainContracts = {
  optimismL2CrossDomainMessenger: { address: '0x4200000000000000000000000000000000000007' },
  optimismL2StandardBridge: { address: '0x4200000000000000000000000000000000000010' },
  optimismGasPriceOracle: { address: '0x420000000000000000000000000000000000000F' },
  optimismL1Block: { address: '0x4200000000000000000000000000000000000015' },
  optimismL2ToL1MessagePasser: { address: '0x4200000000000000000000000000000000000016' },
  optimismL2Erc721Bridge: { address: '0x4200000000000000000000000000000000000014' },
  optimismMintableErc721Factory: { address: '0x4200000000000000000000000000000000000017' },
}
