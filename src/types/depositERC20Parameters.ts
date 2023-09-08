import { Address, Hex } from 'viem'

export type DepositERC20Parameters = {
  l1Token: Address
  l2Token: Address
  amount: bigint
  minGasLimit: bigint
  extraData?: Hex
}
