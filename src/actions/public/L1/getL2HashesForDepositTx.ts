import type { Chain, Hash, PublicClient, TransactionReceipt, Transport } from 'viem'
import { getTransactionReceipt } from 'viem/actions'
import { getL2HashFromL1DepositInfo } from '../../../utils/getL2HashFromL1DepositInfo.js'
import { getTransactionDepositedEvents } from '../../../utils/getTransactionDepositedEvents.js'

export type GetL2HashesForDepositTxParamters = {
  l1TxHash: Hash
  l1TxReceipt?: never
} | { l1TxHash?: never; l1TxReceipt: TransactionReceipt }

export type GetL2HashesForDepositTxReturnType = Hash[]

/**
 * Gets the L2 transaction hashes for a given L1 deposit transaction
 *
 * @param {Hash} l1TxHash the L1 transaction hash of the deposit
 * @returns {GetL2HashesForDepositTxReturnType} the L2 transaction hashes for the deposit
 */
export async function getL2HashesForDepositTx<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { l1TxHash, l1TxReceipt }: GetL2HashesForDepositTxParamters,
): Promise<GetL2HashesForDepositTxReturnType> {
  const txReceipt = l1TxReceipt ?? await getTransactionReceipt(client, { hash: l1TxHash })
  const depositEvents = getTransactionDepositedEvents({ txReceipt })

  return depositEvents.map(({ event, logIndex }) =>
    getL2HashFromL1DepositInfo({
      event,
      logIndex,
      blockHash: txReceipt.blockHash,
    })
  )
}
