import {
  base,
  baseGoerli,
  optimism,
  optimismGoerli,
  zora,
  zoraTestnet,
} from '@wagmi/chains'
import { Chain } from 'wagmi'

export const OPStackChains: Chain[] = [
  base,
  baseGoerli,
  optimism,
  optimismGoerli,
  zora,
  zoraTestnet,
]
export const OPStackMainnetChains: Chain[] = [base, optimism, zora]
export const OPStackTestnetChains: Chain[] = [
  baseGoerli,
  optimismGoerli,
  zoraTestnet,
]
