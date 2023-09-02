import { TransactionReceipt, decodeEventLog } from 'viem'
import { TransactionDepositedEvent } from '../types/depositTransaction'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'

type GetDepositEventInfoFromTxReceiptParams = {
  receipt: TransactionReceipt
}

/**
 * @description Returns the TransactionDeposited event and log index, if found,
 * from the transaction receipt
 *
 * @param receipt the receipt of the transaction supposedly containing the TransactionDeposited event
 * @returns An array of L2 transaction hashes, corresponding to all TransactionDeposited events found in the transaction
 */
export function getDepositEventsInfoFromTxReceipt({
  receipt,
}: GetDepositEventInfoFromTxReceiptParams): {
  event: TransactionDepositedEvent
  logIndex: number
}[] {
  let depositEvents: { event: TransactionDepositedEvent; logIndex: number }[] =
    []
  for (const l of receipt.logs) {
    try {
      const event = decodeEventLog({
        abi: optimismPortalABI,
        data: l.data,
        topics: l.topics,
      })
      if (event.eventName === 'TransactionDeposited') {
        if (!l.logIndex) {
          throw new Error('Found TransactionDeposited by logIndex undefined')
        }
        depositEvents.push({ event, logIndex: l.logIndex })
      }
      // The transaction may have events from many contracts
      // we can ignore errors decoding transactions we do not care about.
    } catch {}
  }
  return depositEvents
}
