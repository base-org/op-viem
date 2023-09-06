import { baseGoerli as viemChain } from 'viem/chains'
import { OpStackChain } from '../types/opStackChain'
import { opStackL2ChainContracts } from '../types/opStackContracts'

export const baseGoerli = {
  ...viemChain,
  contracts: {
    ...viemChain.contracts,
    ...opStackL2ChainContracts,
  },
  opStackConfig: {
    l1: {
      chainId: 5,
      contracts: {
        optimismL1CrossDomainMessenger: {
          address: '0x8e5693140eA606bcEB98761d9beB1BC87383706D',
        },
        optimismL1Erc721Bridge: {
          address: '0x5E0c967457347D5175bF82E8CCCC6480FCD7e568',
        },
        optimismL1StandardBridge: {
          address: '0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a',
        },
        optimismL2OutputOracle: {
          address: '0x2A35891ff30313CcFa6CE88dcf3858bb075A2298',
        },
        optimismPortal: {
          address: '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA',
        },
      },
    },
  },
} satisfies OpStackChain
