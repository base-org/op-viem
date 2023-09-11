import { concat, type Hex, toRlp, trim } from 'viem'
import { DEPOSIT_TX_PREFIX, type DepositTransaction } from '../types/depositTransaction.js'

export function rlpEncodeDepositTransaction(
  depositTx: DepositTransaction,
): Hex {
  const trimmedMint = trim(depositTx.mint)
  const trimmedValue = trim(depositTx.value)
  const trimmedGas = trim(depositTx.gas)
  const rlp = toRlp([
    depositTx.sourceHash,
    depositTx.from,
    depositTx.to,
    // NOTE(Wilson): I am not sure who is *correct* here but OP encodes
    // '0x00' as '0x' and viem trim does not have the same behavior
    trimmedMint === '0x00' ? '0x' : trimmedMint,
    trimmedValue === '0x00' ? '0x' : trimmedValue,
    trimmedGas === '0x00' ? '0x' : trimmedGas,
    depositTx.isSystemTransaction ? '0x1' : '0x',
    depositTx.data,
  ])
  return concat([DEPOSIT_TX_PREFIX, rlp])
}
