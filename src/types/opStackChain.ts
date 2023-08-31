import { Chain } from "viem";

export type OpStackL1Chain = Chain & {
    contracts: {
        optimismL1CrossDomainMessenger?: {
            [chainId: number]: unknown
          }
          optimismL1Erc721Bridge?: {
            [chainId: number]: unknown
          }
          optimismL1StandardBridge?: {
            [chainId: number]: unknown
          }
          optimismL2OutputOracle?: {
            [chainId: number]: unknown
          }
          optimismMintableErc20Factory?: {
            [chainId: number]: unknown
          }
          optimismPortal?: {
            [chainId: number]: unknown
          }
          optimismSystemConfig?: {
            [chainId: number]: unknown
          }
          optimismSystemDictator?: {
            [chainId: number]: unknown
          }
    }
}

export type OpStackL2Chain = Chain & {
    contracts: {
        optimismL2CrossDomainMessenger: '0x4200000000000000000000000000000000000007'
        optimismL2StandardBridge: '0x4200000000000000000000000000000000000010'
        optimismGasPriceOracle: '0x420000000000000000000000000000000000000F'
        optimismL1Block: '0x4200000000000000000000000000000000000015'
        optimismL2ToL1MessagePasser: '0x4200000000000000000000000000000000000016'
        optimismL2Erc721Bridge: '0x4200000000000000000000000000000000000014'
        optimismMintableErc721Factory?: '0x4200000000000000000000000000000000000017'
    }
}