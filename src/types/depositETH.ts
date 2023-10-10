import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Address, Hex } from 'viem'
import { OpStackL1Contract } from './opStackContracts.js'

export const ABI = optimismPortalABI
export const CONTRACT = OpStackL1Contract.OptimismPortal
export const FUNCTION = 'depositTransaction'

export type DepositETHParameters = {
  to: Address
  gasLimit: number
  extraData?: Hex
}
