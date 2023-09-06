import { optimismGoerli as viemOptimismGoerli } from 'viem/chains'
import { OpStackChain } from '../types/opStackChain'
import { opStackL2ChainContracts } from '../types/opStackContracts'

export const optimismGoerli = {
  ...viemOptimismGoerli,
  contracts: {
    ...viemOptimismGoerli.contracts,
    ...opStackL2ChainContracts,
  },
  opStackConfig: {
    l1: {
      chainId: 5,
      contracts: {
        optimismL1Erc721Bridge: {
          address: '0x8DD330DdE8D9898d43b4dc840Da27A07dF91b3c9',
          blockCreated: 7682740,
        },
        optimismL1CrossDomainMessenger: {
          address: '0x9D1dACf9d9299D17EFFE1aAd559c06bb3Fbf9BC4',
        },
        optimismL1StandardBridge: {
          address: '0x636Af16bf2f682dD3109e60102b8E1A089FedAa8',
        },
        optimismL2OutputOracle: {
          address: '0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0',
        },
        optimismPortal: {
          address: '0x9e760aBd847E48A56b4a348Cba56Ae7267FeCE80',
        },
      },
    },
  },
} satisfies OpStackChain
