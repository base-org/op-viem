import type { ChainContract } from 'viem'

export enum OpStackL1Contract {
  L1CrossDomainMessenger = 'l1CrossDomainMessenger',
  L1Erc721Bridge = 'l1Erc721Bridge',
  L1StandardBridge = 'l1StandardBridge',
  L2OutputOracle = 'l2OutputOracle',
  OptimismPortal = 'optimismPortal',
}

export enum OpStackL2Contract {
  L2CrossDomainMessenger = 'l2CrossDomainMessenger',
  L2StandardBridge = 'l2StandardBridge',
  GasPriceOracle = 'gasPriceOracle',
  L1Block = 'l1Block',
  L2ToL1MessagePasser = 'l2ToL1MessagePasser',
  L2Erc721Bridge = 'l2Erc721Bridge',
  OptimismMintableErc721Factory = 'optimismMintableErc721Factory',
}

export type OpStackL2ChainContracts = { [key in OpStackL2Contract]: ChainContract }

export const opStackL2ChainContracts: OpStackL2ChainContracts = {
  l2CrossDomainMessenger: { address: '0x4200000000000000000000000000000000000007' },
  l2StandardBridge: { address: '0x4200000000000000000000000000000000000010' },
  gasPriceOracle: { address: '0x420000000000000000000000000000000000000F' },
  l1Block: { address: '0x4200000000000000000000000000000000000015' },
  l2ToL1MessagePasser: { address: '0x4200000000000000000000000000000000000016' },
  l2Erc721Bridge: { address: '0x4200000000000000000000000000000000000014' },
  optimismMintableErc721Factory: { address: '0x4200000000000000000000000000000000000017' },
}
