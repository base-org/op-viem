import type { Addresses } from '../types/addresses.js'

export const zoraGoerliAddresses: Addresses<5> = {
  portal: {
    address: '0xDb9F51790365e7dc196e7D072728df39Be958ACe',
    chainId: 5,
    blockCreated: 8942392,
  },
  l2OutputOracle: {
    address: '0xdD292C9eEd00f6A32Ff5245d0BCd7f2a15f24e00',
    chainId: 5,
    blockCreated: 8942390,
  },
  l1StandardBridge: {
    address: '0x39CCDe9769d52d61189AB799d91665A11b5f3464',
    chainId: 5,
    blockCreated: 8942398,
  },
  l1CrossDomainMessenger: {
    address: '0x9779A9D2f3B66A4F4d27cB99Ab6cC1266b3Ca9af',
    chainId: 5,
    blockCreated: 8942397,
  },
  l1Erc721Bridge: {
    address: '0x57C1C6b596ce90C0e010c358DD4Aa052404bB70F',
    chainId: 5,
    blockCreated: 8942394,
  },
} as const
