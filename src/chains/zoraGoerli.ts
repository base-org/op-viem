import { goerli, zoraTestnet as viemZoraTestnet } from 'viem/chains'
import type { OpStackChain } from '../types/opStackChain.js'
import { opStackL2ChainContracts } from '../types/opStackContracts.js'

export const zoraGoerli: OpStackChain & {
  opStackConfig: { l1: { chainId: (typeof goerli)['id'] } }
} = {
  ...viemZoraTestnet,
  contracts: {
    ...viemZoraTestnet.contracts,
    ...opStackL2ChainContracts,
  },
  opStackConfig: {
    l1: {
      chainId: 5,
      contracts: {
        l1CrossDomainMessenger: {
          address: '0x9779A9D2f3B66A4F4d27cB99Ab6cC1266b3Ca9af',
          blockCreated: 8942397,
        },
        l1Erc721Bridge: {
          address: '0x7e3A6D16c3017b7876138350749981704cA333E',
          blockCreated: 8942402,
        },
        l1StandardBridge: {
          address: '0x39CCDe9769d52d61189AB799d91665A11b5f3464',
          blockCreated: 8942398,
        },
        l2OutputOracle: {
          address: '0x5881e7B1429FE78b1c98eBAe55d67184597a787c',
          blockCreated: 8942399,
        },
        optimismPortal: {
          address: '0xc2112491c6A6994f1Aa299FA0A2a0397d7D2b438',
          blockCreated: 8942400,
        },
      },
    },
  },
} as const satisfies OpStackChain
