import { base as viemBase, mainnet } from 'viem/chains'
import type { OpStackChain } from '../types/opStackChain.js'
import { opStackL2ChainContracts } from '../types/opStackContracts.js'

export const base: OpStackChain & { opStackConfig: { l1: { chainId: typeof mainnet['id'] } } } = {
  ...viemBase,
  contracts: {
    ...viemBase.contracts,
    ...opStackL2ChainContracts,
  },
  opStackConfig: {
    l1: {
      chainId: 1,
      contracts: {
        l1CrossDomainMessenger: {
          address: '0x866E82a600A1414e583f7F13623F1aC5d58b0Afa',
          blockCreated: 17482143,
        },
        l1Erc721Bridge: {
          address: '0x608d94945A64503E642E6370Ec598e519a2C1E53',
          blockCreated: 17482143,
        },
        l1StandardBridge: {
          address: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
          blockCreated: 17482143,
        },
        l2OutputOracle: {
          address: '0x56315b90c40730925ec5485cf004d835058518A0',
          blockCreated: 17482143,
        },
        optimismPortal: {
          address: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e',
          blockCreated: 17482143,
        },
      },
    },
  },
} as const satisfies OpStackChain
