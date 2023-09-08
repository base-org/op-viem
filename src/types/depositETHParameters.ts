import { Hex } from 'viem'

export type DepositETHParameters = {
  minGasLimit: bigint
  extraData?: Hex
}
