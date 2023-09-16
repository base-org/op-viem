import { mainnet, zora as viemZora } from 'viem/chains'
import type { OpStackChain } from '../types/opStackChain.js'
import { opStackL2ChainContracts } from '../types/opStackContracts.js'

export const zora: OpStackChain & {
  opStackConfig: { l1: { chainId: (typeof mainnet)['id'] } }
} = {
  ...viemZora,
  contracts: {
    ...viemZora.contracts,
    ...opStackL2ChainContracts,
  },
  opStackConfig: {
    l1: {
      chainId: 1,
      contracts: {
        l1CrossDomainMessenger: {
          address: '0x363B4B1ADa52E50353f746999bd9E94395190d2C',
          blockCreated: 17473943,
        },
        l1Erc721Bridge: {
          address: '0xDBCdA21518AF39E7feb9748F6718D3db11591461',
          blockCreated: 17473948,
        },
        l1StandardBridge: {
          address: '0xbF6acaF315477b15D638bf4d91eA48FA79b58335',
          blockCreated: 17473944,
        },
        l2OutputOracle: {
          address: '0x89336159Edd615260a95309e46343602D6b6489e',
          blockCreated: 17473945,
        },
        optimismPortal: {
          address: '0x43260ee547c3965bb2a0174763bb8FEcC650BA4A',
          blockCreated: 17473946,
        },
      },
    },
  },
} as const satisfies OpStackChain
