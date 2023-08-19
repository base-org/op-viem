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
