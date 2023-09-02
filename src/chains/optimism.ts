import { opStackL2ContractAddresses } from '../types/opStackContracts'
import { Chain } from 'viem'
import { optimism as viemOptimism } from 'viem/chains'

export const optimism = {
  ...viemOptimism,
  contracts: {
    ...viemOptimism.contracts,
    ...opStackL2ContractAddresses,
  },
} satisfies Chain
