import { opStackL2ContractAddresses } from '../types/opStackContracts'
import { Chain } from 'viem'
import { baseGoerli as viemBaseGoerli } from 'viem/chains'

export const baseGoerli = {
  ...viemBaseGoerli,
  contracts: {
    ...viemBaseGoerli.contracts,
    ...opStackL2ContractAddresses,
  },
} satisfies Chain
