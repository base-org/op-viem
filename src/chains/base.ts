import { Chain, ChainContract } from 'viem'
import { base as viemBase } from 'viem/chains'

export type OpStackChain = Chain & {
  contracts: OpStackL2Contracts
  optimismConfig: OptimismConfig
}

export type OptimismConfig = {
  l1: {
    chainId: number
    contracts: {
      [key: string]: ChainContract
    }
  }
}

type OpStackL2Contracts = {
  optimismL2CrossDomainMessenger: ChainContract
  optimismL2StandardBridge: ChainContract
  optimismGasPriceOracle: ChainContract
  optimismL1Block: ChainContract
  optimismL2ToL1MessagePasser: ChainContract
  optimismL2Erc721Bridge: ChainContract
  optimismMintableErc721Factory: ChainContract
}

const opStackL2Contracts: OpStackL2Contracts = {
  optimismL2CrossDomainMessenger: { address: '0x4200000000000000000000000000000000000007' },
  optimismL2StandardBridge: { address: '0x4200000000000000000000000000000000000010' },
  optimismGasPriceOracle: { address: '0x420000000000000000000000000000000000000F' },
  optimismL1Block: { address: '0x4200000000000000000000000000000000000015' },
  optimismL2ToL1MessagePasser: { address: '0x4200000000000000000000000000000000000016' },
  optimismL2Erc721Bridge: { address: '0x4200000000000000000000000000000000000014' },
  optimismMintableErc721Factory: { address: '0x4200000000000000000000000000000000000017' },
}

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
