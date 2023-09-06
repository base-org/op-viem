import { Chain, ChainContract } from 'viem'
import { OpStackL1Contract, OpStackL2ChainContracts } from './opStackContracts'

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
