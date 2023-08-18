import {
  base,
  baseGoerli,
  optimism,
  optimismGoerli,
  zora,
  zoraTestnet,
} from '@wagmi/chains'
import { Address, Chain } from 'wagmi'

export function getL1PortalForChain(chain: Chain): Address {
  switch (chain) {
    case base:
      return '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e'
    case baseGoerli:
      return '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'
    case optimism:
      return '0x28a55488fef40005309e2DA0040DbE9D300a64AB'
    case optimismGoerli:
      return '0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383'
    case zora:
      return '0x1a0ad011913A150f69f6A19DF447A0CfD9551054'
    case zoraTestnet:
      return '0xDb9F51790365e7dc196e7D072728df39Be958ACe'
    default:
      throw new Error(`No known L1 Portal for chain ${chain}`)
  }
}
