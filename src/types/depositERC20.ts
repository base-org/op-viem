import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Address, Hex } from 'viem'
import { OpStackL1Contract } from './opStackContracts'

export const ABI = l1StandardBridgeABI
export const CONTRACT = OpStackL1Contract.L1StandardBridge
export const FUNCTION = 'depositERC20To'

export type DepositERC20Parameters = {
  l1Token: Address
  l2Token: Address
  to: Address
  amount: bigint
  minGasLimit: bigint
  extraData?: Hex
}
