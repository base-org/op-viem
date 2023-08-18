import { Hex, decodeEventLog, type PublicClient } from "viem";
import { getDepositEventLogIndexFromTxReceipt } from "./getDepositEventLogIndexFromTxReceipt";

export async function getL2TxForL1Deposit(l1TxHash: Hex, client: PublicClient)  {
    const receipt = await client.getTransactionReceipt({hash: '0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c'})
    const logIndex = getDepositEventLogIndexFromTxReceipt(receipt)
}