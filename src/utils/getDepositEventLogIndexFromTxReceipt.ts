import { TransactionReceipt, decodeEventLog } from 'viem'
import { optimismPortalABI } from '../generated/contracts'

type TransactionDepositedEvent = {
  eventName: 'TransactionDeposited'
  args: {
    from: `0x${string}`
    to: `0x${string}`
    version: bigint
    opaqueData: `0x${string}`
  }
}

/**
 * @description Returns the TransactionDeposited event and log index, if found,
 * from the transaction receipt
 *
 * @param receipt the receipt of the transaction supposedly containing the TransactionDeposited event
 * @param index an optional param, the index of the TransactionDeposited event among all TransactionDeposited
 * events in this transaction. Useful, e.g., for a multicall.
 * @returns A Private Key Account.
 */
export function getDepositEventInfoFromTxReceipt(
  receipt: TransactionReceipt,
  index = 0,
): { event: TransactionDepositedEvent; logIndex: number } | undefined {
  let found = 0
  for (const l of receipt.logs) {
    const event = decodeEventLog({
      abi: optimismPortalABI,
      data: l.data,
      topics: l.topics,
    })
    if (l.logIndex && event.eventName === 'TransactionDeposited') {
      if (found == index) {
        return { event, logIndex: l.logIndex }
      } else {
        ++found
      }
    }
  }
}
