import { type Chain, type ChainContract } from 'viem'
import { OpStackL1Contract, type OpStackL2ChainContracts } from './opStackContracts.js'

export type OpStackChain = Chain & {
  contracts: OpStackL2ChainContracts
  opStackConfig: OpStackConfig
}

export type OpStackConfig = {
  l1: {
    chainId: number
    contracts: {
      [key in OpStackL1Contract]: ChainContract
    }
  }
}
