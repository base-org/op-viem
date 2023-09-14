import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type { Address, Hex } from 'viem'

export const OVM_ETH = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'

export const ABI = l2StandardBridgeABI
export const FUNCTION = 'withdrawTo'

export type WithdrawToParameters = {
  l2Token: Address
  to: Address
  amount: bigint
  minGasLimit: number
  extraData?: Hex
}

export type WithdrawETHParameters = Omit<WithdrawToParameters, 'l2Token'>
