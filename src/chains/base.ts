import { Chain } from 'viem'
import { base as viemBase } from 'viem/chains'
import { opStackL2ContractAddresses } from '../types/opStackContracts'

export const base = {
  ...viemBase,
  contracts: {
    ...viemBase.contracts,
    ...opStackL2ContractAddresses,
  },
} satisfies Chain
