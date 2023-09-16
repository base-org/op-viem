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
          address: '0x83A4521A3573Ca87f3a971B169C5A0E1d34481c3',
          blockCreated: 17473940,
        },
        l1StandardBridge: {
          address: '0xbF6acaF315477b15D638bf4d91eA48FA79b58335',
          blockCreated: 17473944,
        },
        l2OutputOracle: {
          address: '0x9E6204F750cD866b299594e2aC9eA824E2e5f95c',
          blockCreated: 17473936,
        },
        optimismPortal: {
          address: '0x1a0ad011913A150f69f6A19DF447A0CfD9551054',
          blockCreated: 17473938,
        },
      },
    },
  },
} as const satisfies OpStackChain
