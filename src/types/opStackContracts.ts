import { ChainContract } from 'viem'

export enum OpStackL1Contracts {
  optimismL1CrossDomainMessenger = 'optimismL1CrossDomainMessenger',
  optimismL1Erc721Bridge = 'optimismL1Erc721Bridge',
  optimismL1StandardBridge = 'optimismL1StandardBridge',
  optimismL2OutputOracle = 'optimismL2OutputOracle',
  optimismPortal = 'optimismPortal',
  optimismSystemConfig = 'optimismSystemConfig',
  optimismSystemDictator = 'optimismSystemDictator',
}

export enum OpStackL2Contracts {
  optimismL2CrossDomainMessenger = 'optimismL2CrossDomainMessenger',
  optimismL2StandardBridge = 'optimismL2StandardBridge',
  optimismGasPriceOracle = 'optimismGasPriceOracle',
  optimismL1Block = 'optimismL1Block',
  optimismL2ToL1MessagePasser = 'optimismL2ToL1MessagePasser',
  optimismL2Erc721Bridge = 'optimismL2Erc721Bridge',
  optimismMintableErc721Factory = 'optimismMintableErc721Factory',
}

export const opStackL2ContractAddresses: { [key: string]: ChainContract } = {
  optimismL2CrossDomainMessenger: {
    address: '0x4200000000000000000000000000000000000007',
  },
  optimismL2StandardBridge: {
    address: '0x4200000000000000000000000000000000000010',
  },
  optimismGasPriceOracle: {
    address: '0x420000000000000000000000000000000000000F',
  },
  optimismL1Block: {
    address: '0x4200000000000000000000000000000000000015',
  },
  optimismL2ToL1MessagePasser: {
    address: '0x4200000000000000000000000000000000000016',
  },
  optimismL2Erc721Bridge: {
    address: '0x4200000000000000000000000000000000000014',
  },
  optimismMintableErc721Factory: {
    address: '0x4200000000000000000000000000000000000017',
  },
}
