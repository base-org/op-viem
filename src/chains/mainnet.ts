import { mainnet as viemMainnet } from 'viem/chains'
import { ContractRichChain } from '../_test/utils'

export const mainnet = {
  ...viemMainnet,
  contracts: {
    ...viemMainnet.contracts,
    optimismL1CrossDomainMessenger: {
      8453: '0x866E82a600A1414e583f7F13623F1aC5d58b0Afa',
      7777777: '0xdC40a14d9abd6F410226f1E6de71aE03441ca506',
      10: '0xD87342e16352D33170557A7dA1e5fB966a60FafC',
    },
    optimismL1Erc721Bridge: {
      8453: '0x608d94945A64503E642E6370Ec598e519a2C1E53',
    },
    optimismL1StandardBridge: {
      8453: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
      7777777: '0x3e2Ea9B92B7E48A52296fD261dc26fd995284631',
      10: '0x7CC09AC2452D6555d5e0C213Ab9E2d44eFbFc956',
    },
    optimismL2OutputOracle: {
      8453: '0x56315b90c40730925ec5485cf004d835058518A0',
      7777777: '0x9E6204F750cD866b299594e2aC9eA824E2e5f95c',
      10: '0xdD292C9eEd00f6A32Ff5245d0BCd7f2a15f24e00',
    },
    optimismPortal: {
      8453: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e',
      7777777: '0x1a0ad011913A150f69f6A19DF447A0CfD9551054',
      10: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
    },
    optimismSystemConfig: {
      8453: '0x73a79Fab69143498Ed3712e519A88a918e1f4072',
    },
    optimismSystemDictator: {
      8453: '0x1fE3fdd1F0193Dd657C0a9AAC37314D6B479E557',
    },
  },
} satisfies ContractRichChain
