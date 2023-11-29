import type { Addresses } from '../types/addresses.js'

export const optimismGoerliAddresses: Addresses<5> = {
  portal: {
    address: '0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383',
    chainId: 5,
  },
  l2OutputOracle: {
    address: '0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0',
    chainId: 5,
  },
  l1StandardBridge: {
    address: '0x636Af16bf2f682dD3109e60102b8E1A089FedAa8',
    chainId: 5,
  },
  l1CrossDomainMessenger: {
    address: '0x5086d1eEF304eb5284A0f6720f79403b4e9bE294',
    chainId: 5,
  },
  l1Erc721Bridge: {
    address: '0x0F9C590b958002E8B10a7431979c1aF882772E88',
    chainId: 5,
  },
} as const
