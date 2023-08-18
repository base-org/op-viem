import { TransactionReceipt, decodeEventLog } from "viem";
import { optimismPortalABI } from "../generated/contracts";

export function getDepositEventLogIndexFromTxReceipt(receipt: TransactionReceipt, index = 0) {
    let found = 0;
    for (const l of receipt.logs) {
        const event = decodeEventLog({
          abi: optimismPortalABI,
          data: l.data,
          topics: l.topics,
        })
        if (event.eventName === 'TransactionDeposited') {
            if (found == index) {
                return l.logIndex
            } else {
                ++found;
            }
        }
      }
}