import { type PublicClient, Chain, Transport, Hash } from 'viem'
import { getTransactionDepositedEvents } from '../../../utils/getTransactionDepositedEvents'
import { getL2HashFromL1DepositInfo } from '../../../utils/getL2HashFromL1DepositInfo'

export type GetL2HashesForDepositTxParamters = {
  l1TxHash: Hash
}

export type GetL2HashesForDepositTxReturnType = Hash[]

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
    }),
  )
}
