import { TransactionReceipt, decodeEventLog } from 'viem'
import { optimismPortalABI } from '../generated/contracts'
import { TransactionDepositedEvent } from '../types/depositTx'

/**
 * @description Returns the TransactionDeposited event and log index, if found,
 * from the transaction receipt
 *
 * @param receipt the receipt of the transaction supposedly containing the TransactionDeposited event
 * @returns An array of L2 transaction hashes, corresponding to all TransactionDeposited events found in the transaction
 */
export function getDepositEventInfoFromTxReceipt(
  receipt: TransactionReceipt,
): { event: TransactionDepositedEvent; logIndex: number }[] {
  let depositEvents = []
  for (const l of receipt.logs) {
    const event = decodeEventLog({
      abi: optimismPortalABI,
      data: l.data,
      topics: l.topics,
    })
    if (l.logIndex && event.eventName === 'TransactionDeposited') {
      depositEvents.push({ event, logIndex: l.logIndex })
    }
  }
  return depositEvents
}
