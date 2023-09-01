import { Chain } from 'viem'
import { zoraTestnet as viemZoraTestnet } from 'viem/chains'
import { opStackL2ContractAddresses } from '../types/opStackContracts'

export const zoraTestnet = {
  ...viemZoraTestnet,
  contracts: {
    ...viemZoraTestnet.contracts,
    ...opStackL2ContractAddresses,
  },
} satisfies Chain
