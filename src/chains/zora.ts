import type { Addresses } from '../types/addresses.js'

export const zoraAddresses: Addresses<1> = {
  portal: {
    address: '0x1a0ad011913A150f69f6A19DF447A0CfD9551054',
    chainId: 1,
    blockCreated: 17473938,
  },
  l2OutputOracle: {
    address: '0x9E6204F750cD866b299594e2aC9eA824E2e5f95c',
    chainId: 1,
    blockCreated: 17473936,
  },
  l1StandardBridge: {
    address: '0xbF6acaF315477b15D638bf4d91eA48FA79b58335',
    chainId: 1,
    blockCreated: 17473944,
  },
  l1CrossDomainMessenger: {
    address: '0x363B4B1ADa52E50353f746999bd9E94395190d2C',
    chainId: 1,
    blockCreated: 17473943,
  },
  l1Erc721Bridge: {
    address: '0x83A4521A3573Ca87f3a971B169C5A0E1d34481c3',
    chainId: 1,
    blockCreated: 17473940,
  },
} as const
