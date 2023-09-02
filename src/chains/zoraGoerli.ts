import { opStackL2ContractAddresses } from '../types/opStackContracts'
import { Chain } from 'viem'
import { zoraTestnet as viemZoraTestnet } from 'viem/chains'

export const zoraTestnet = {
  ...viemZoraTestnet,
  contracts: {
    ...viemZoraTestnet.contracts,
    ...opStackL2ContractAddresses,
  },
} satisfies Chain
