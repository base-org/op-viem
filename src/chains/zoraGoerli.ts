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
          address: '0x57C1C6b596ce90C0e010c358DD4Aa052404bB70F',
          blockCreated: 8942394,
        },
        l1StandardBridge: {
          address: '0x39CCDe9769d52d61189AB799d91665A11b5f3464',
          blockCreated: 8942398,
        },
        l2OutputOracle: {
          address: '0xdD292C9eEd00f6A32Ff5245d0BCd7f2a15f24e00',
          blockCreated: 8942390,
        },
        optimismPortal: {
          address: '0xDb9F51790365e7dc196e7D072728df39Be958ACe',
          blockCreated: 8942392,
        },
      },
    },
  },
} as const satisfies OpStackChain
