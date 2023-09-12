import type { Chain } from 'viem'
import { BaseError } from 'viem'
import type { OpStackChain } from '../types/opStackChain.js'

export class L1ChainMismatchError extends BaseError {
  override name = 'L1ChainMismatchError'
  constructor(
    { chainId, opChainL1ChainId }: {
      chainId: Chain['id'] | undefined
      opChainL1ChainId: OpStackChain['opStackConfig']['l1']['chainId']
    },
  ) {
    super(
      `Chain ID "${chainId}" does not match expected L1 chain ID "${opChainL1ChainId}"`,
    )
  }
}

export class L2ChainOrAddressError extends BaseError {
  override name = 'L2ChainOrAddressError'
  constructor({ contract }: { contract: string }) {
    super(
      `Must provide either l2Chain or ${contract}Address"`,
    )
  }
}
