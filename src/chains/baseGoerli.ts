import type { Addresses } from '../types/addresses.js'

export const baseGoerliAddresses: Addresses<5> = {
  portal: {
    address: '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA',
    chainId: 5,
  },
  l2OutputOracle: {
    address: '0x2A35891ff30313CcFa6CE88dcf3858bb075A2298',
    chainId: 5,
  },
  l1StandardBridge: {
    address: '0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a',
    chainId: 5,
  },
  l1CrossDomainMessenger: {
    address: '0x8e5693140eA606bcEB98761d9beB1BC87383706D',
    chainId: 5,
  },
  l1Erc721Bridge: {
    address: '0x5E0c967457347D5175bF82E8CCCC6480FCD7e568',
    chainId: 5,
  },
} as const
