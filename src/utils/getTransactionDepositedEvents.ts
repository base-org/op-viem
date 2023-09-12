import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { decodeEventLog, type TransactionReceipt } from 'viem'
import { type TransactionDepositedEvent } from '../types/depositTransaction.js'

export type TransactionDepositedEventDetails = {
  event: TransactionDepositedEvent
  logIndex: number
}

export type GetTransactionDepositedEventsParams = {
  txReceipt: TransactionReceipt
}

export type GetTransactionDepositedEventsReturnType = TransactionDepositedEventDetails[]

/**
 * @description Returns the TransactionDeposited event and log index, if found,
 * from the transaction receipt
 *
 * @param {TransactionReceipt} receipt the receipt of the transaction supposedly containing the TransactionDeposited event
 * @returns {GetDepositEventInfoFromTxReceiptParams} An array of L2 transaction hashes, corresponding to all TransactionDeposited events found in the transaction
 */
export function getTransactionDepositedEvents({
  txReceipt,
}: GetTransactionDepositedEventsParams): GetTransactionDepositedEventsReturnType {
  const depositEvents: {
    event: TransactionDepositedEvent
    logIndex: number
  }[] = []
  for (const l of txReceipt.logs) {
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
