import { type PublicClient, Chain, Transport, Hash } from 'viem'
import { getDepositEventInfoFromTxReceipt } from '../utils/getDepositEventLogIndexFromTxReceipt'
import { getL2HashesFromL1DepositInfo } from '../utils/getL2HashesFromL1DepositInfo'

export type GetL2HashesForDepositTxParamters = {
  l1TxHash: Hash
}

export type GetL2HashesForDepositTxReturnType = Hash[]

export async function getL2HashesForDepositTx<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { l1TxHash }: GetL2HashesForDepositTxParamters,
): Promise<GetL2HashesForDepositTxReturnType> {
  const receipt = await client.getTransactionReceipt({ hash: l1TxHash })
  var depositEvents = getDepositEventInfoFromTxReceipt(receipt)

  return depositEvents.map((event) =>
    getL2HashesFromL1DepositInfo(
      event.event,
      event.logIndex,
      receipt.blockHash,
    ),
  )
}
