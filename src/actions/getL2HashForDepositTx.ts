import { type PublicClient, Chain, Transport, Hash } from 'viem'
import { getDepositEventInfoFromTxReceipt } from '../utils/getDepositEventLogIndexFromTxReceipt'
import { DepositTxNotFoundError } from '../errors/depositTx'
import { getL2HashFromL1DepositInfo } from '../utils/getL2HashFromL1DepositInfo'

export type GetL2HashForDepositTxParamters = {
  l1TxHash: Hash
}

export type GetL2HashForDepositTxReturnType = Hash[]

export async function getL2HashForDepositTx<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { l1TxHash }: GetL2HashForDepositTxParamters,
): Promise<GetL2HashForDepositTxReturnType> {
  const receipt = await client.getTransactionReceipt({ hash: l1TxHash })
  var depositEvents = getDepositEventInfoFromTxReceipt(receipt)

  if (!depositEvents) {
    throw new DepositTxNotFoundError({ l1TxHash })
  }

  return depositEvents.map((event) =>
    getL2HashFromL1DepositInfo(event.event, event.logIndex, receipt.blockHash),
  )
}
