import { mainnet, optimism as viemOptimism } from 'viem/chains'
import type { Addresses } from '../types/addresses.js'
import type { OpStackChain } from '../types/opStackChain.js'
import { opStackL2ChainContracts } from '../types/opStackContracts.js'

export const optimism: OpStackChain & { opStackConfig: { l1: { chainId: typeof mainnet['id'] } } } = {
  ...viemOptimism,
  contracts: {
    ...viemOptimism.contracts,
    ...opStackL2ChainContracts,
  },
  opStackConfig: {
    l1: {
      chainId: 1,
      contracts: {
        l1CrossDomainMessenger: {
          address: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1',
          blockCreated: 12686757,
        },
        l1Erc721Bridge: {
          address: '0x5a7749f83b81B301cAb5f48EB8516B986DAef23D',
          blockCreated: 15677422,
        },
        l1StandardBridge: {
          address: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
          blockCreated: 12686786,
        },
        l2OutputOracle: {
          address: '0xdfe97868233d1aa22e815a266982f2cf17685a27',
          blockCreated: 17365801,
        },
        portal: {
          address: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
          blockCreated: 17365802,
        },
      },
    },
  },
} as const satisfies OpStackChain

export const optimismAddresses: Addresses<1> = {
  portal: {
    address: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
    chainId: 1,
    blockCreated: 17365802,
  },
  l2OutputOracle: {
    address: '0xdfe97868233d1aa22e815a266982f2cf17685a27',
    chainId: 1,
    blockCreated: 17365801,
  },
  l1StandardBridge: {
    address: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
    chainId: 1,
    blockCreated: 12686786,
  },
  l1CrossDomainMessenger: {
    address: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1',
    chainId: 1,
    blockCreated: 12686757,
  },
  l1Erc721Bridge: {
    address: '0x5a7749f83b81B301cAb5f48EB8516B986DAef23D',
    chainId: 1,
    blockCreated: 15677422,
  },
} as const
