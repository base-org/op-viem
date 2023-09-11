import type { Chain, Hash, PublicClient, Transport } from 'viem'
import { getL2HashFromL1DepositInfo } from '../../../utils/getL2HashFromL1DepositInfo.js'
import { getTransactionDepositedEvents } from '../../../utils/getTransactionDepositedEvents.js'

export type GetL2HashesForDepositTxParamters = {
  l1TxHash: Hash
}

export type GetL2HashesForDepositTxReturnType = Hash[]

/**
 * Gets the L2 transaction hashes for a given L1 deposit transaction
 *
 * @param {Hash} l1TxHash the L1 transaction hash of the deposit
 * @returns {GetL2HashesForDepositTxReturnType} the L2 transaction hashes for the deposit
 */
export async function getL2HashesForDepositTx<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { l1TxHash }: GetL2HashesForDepositTxParamters,
): Promise<GetL2HashesForDepositTxReturnType> {
  const txReceipt = await client.getTransactionReceipt({ hash: l1TxHash })
  const depositEvents = getTransactionDepositedEvents({ txReceipt })

  return depositEvents.map(({ event, logIndex }) =>
    getL2HashFromL1DepositInfo({
      event,
      logIndex,
      blockHash: txReceipt.blockHash,
    })
  )
}
