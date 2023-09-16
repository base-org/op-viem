import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type { Address, Hex } from 'viem'
import { OpStackL1Contract } from './opStackContracts.js'

// TODO(Wilson): Consider moving these to actions/wallet/L1/types
export const ABI = l1StandardBridgeABI
export const CONTRACT = OpStackL1Contract.L1StandardBridge
export const FUNCTION = 'depositERC20To'

export type DepositERC20Parameters = {
  l1Token: Address
  l2Token: Address
  to: Address
  amount: bigint
  minGasLimit: number
  extraData?: Hex
}
