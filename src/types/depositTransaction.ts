import type { Address, Hex } from 'viem'

// https://github.com/ethereum-optimism/op-geth/blob/optimism/core/types/deposit_tx.go#L25
export const DEPOSIT_TX_PREFIX = '0x7E'

// https://github.com/ethereum-optimism/optimism/blob/develop/op-node/rollup/derive/deposit_source.go#L15-L18
export enum SourceHashDomain {
  UserDeposit = 0,
  // TODO(wilson): consider supporting system transactions
  // L1InfoDeposit = 1,
}

// https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L73C1-L73C1
export type TransactionDepositedEvent = {
  eventName: 'TransactionDeposited'
  args: {
    from: Address
    to: Address
    version: bigint
    opaqueData: Hex
  }
}

// https://github.com/ethereum-optimism/op-geth/blob/optimism/core/types/deposit_tx.go#L27-L44
export type DepositTransaction = {
  sourceHash: Hex
  from: Address
  to: Address
  mint: Hex
  value: Hex
  gas: Hex
  isSystemTransaction: boolean
  data: Hex
}
