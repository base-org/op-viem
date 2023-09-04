import { Chain, mainnet as viemMainnet } from 'viem/chains'

export const mainnet = {
  ...viemMainnet,
  contracts: {
    ...viemMainnet.contracts,
    optimismL1CrossDomainMessenger: {
      8453: {
        address: '0x866E82a600A1414e583f7F13623F1aC5d58b0Afa',
        blockCreated: 17482143,
      },
      7777777: {
        address: '0xdC40a14d9abd6F410226f1E6de71aE03441ca506',
        blockCreated: 17473937,
      },
      10: {
        address: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1',
        blockCreated: 12686757,
      },
    },
    optimismL1Erc721Bridge: {
      8453: {
        address: '0x608d94945A64503E642E6370Ec598e519a2C1E53',
        blockCreated: 17482143,
      },
    },
    optimismL1StandardBridge: {
      8453: {
        address: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
        blockCreated: 17482143,
      },
      7777777: {
        address: '0x3e2Ea9B92B7E48A52296fD261dc26fd995284631',
        blockCreated: 17473935,
      },
      10: {
        address: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
        blockCreated: 12686786,
      },
    },
    optimismL2OutputOracle: {
      8453: {
        address: '0x56315b90c40730925ec5485cf004d835058518A0',
        blockCreated: 17482143,
      },
      7777777: {
        address: '0x9E6204F750cD866b299594e2aC9eA824E2e5f95c',
        blockCreated: 17473936,
      },
      10: {
        address: '0xdfe97868233d1aa22e815a266982f2cf17685a27',
        blockCreated: 17365801,
      },
    },
    optimismPortal: {
      8453: {
        address: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e',
        blockCreated: 17482143,
      },
      7777777: {
        address: '0x1a0ad011913A150f69f6A19DF447A0CfD9551054',
        blockCreated: 17473938,
      },
      10: {
        address: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
        blockCreated: 17365802,
      },
    },
    optimismSystemConfig: {
      8453: {
        address: '0x73a79Fab69143498Ed3712e519A88a918e1f4072',
        blockCreated: 17482143,
      },
    },
    optimismSystemDictator: {
      8453: {
        address: '0x1fE3fdd1F0193Dd657C0a9AAC37314D6B479E557',
        blockCreated: 17482143,
      },
    },
  },
} satisfies Chain
