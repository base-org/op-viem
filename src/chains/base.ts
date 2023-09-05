import { base as viemBase } from 'viem/chains'

export const base = {
  ...viemBase,
  contracts: {
    ...viemBase.contracts,
    ...opStackL2Contracts,
  },
  optimismConfig: {
    l1: {
      chainId: 1,
      contracts: {
        optimismL1CrossDomainMessenger: {
          address: '0x866E82a600A1414e583f7F13623F1aC5d58b0Afa',
          blockCreated: 17482143,
        },
        optimismL1Erc721Bridge: {
          address: '0x608d94945A64503E642E6370Ec598e519a2C1E53',
          blockCreated: 17482143,
        },
        optimismL1StandardBridge: {
          address: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
          blockCreated: 17482143,
        },
        optimismL2OutputOracle: {
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
} satisfies OpStackChain
