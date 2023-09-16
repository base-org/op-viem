import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type { Address, Hex } from 'viem'
import { OpStackL1Contract } from './opStackContracts.js'

export const ABI = l1StandardBridgeABI
export const CONTRACT = OpStackL1Contract.L1StandardBridge
export const FUNCTION = 'depositETHTo'

export type DepositETHParameters = {
  to: Address
  minGasLimit: number
  extraData?: Hex
}
