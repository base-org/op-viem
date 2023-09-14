import { type Address, type Hex } from 'viem'

export type MessagePassedEvent = {
  nonce: bigint
  sender: Address
  target: Address
  value: bigint
  gasLimit: bigint
  data: Hex
  withdrawalHash: Hex
}
