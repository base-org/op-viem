import { Chain } from 'viem'
import { optimism as viemOptimism } from 'viem/chains'
import { opStackL2ContractAddresses } from '../types/opStackContracts'

export const optimism = {
  ...viemOptimism,
  contracts: {
    ...viemOptimism.contracts,
    ...opStackL2ContractAddresses,
  },
} satisfies Chain
