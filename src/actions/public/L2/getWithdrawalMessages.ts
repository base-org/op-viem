import { l2ToL1MessagePasserABI } from '@eth-optimism/contracts-ts'
import { type Chain, decodeEventLog, type Hash, type PublicClient, type TransactionReceipt, type Transport } from 'viem'
import { getTransactionReceipt } from 'viem/actions'
import type { MessagePassedEvent } from '../../../types/withdrawal.js'

export type GetWithdrawalMessagesParameters = {
  hash: Hash
  txReceipt?: never
} | { hash?: never; txReceipt: TransactionReceipt }

export type GetWithdrawalMessagesReturnType = {
  messages: MessagePassedEvent[]
  blockNumber: bigint
}

/**
 * Retrieves all MessagePassed events from a withdrawal transaction
 *
 * @param client - Public client to use
 * @param {GetWithdrawalMessagesParameters} parameters - {@link GetWithdrawalMessagesParameters}
 * @returns {GetWithdrawalMessagesReturnType} An array of all MessagePassed events emitted in this transaction. {@link GetWithdrawalMessagesReturnType}
 */
export async function getWithdrawalMessages<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { hash, txReceipt }: GetWithdrawalMessagesParameters,
): Promise<GetWithdrawalMessagesReturnType> {
  const receipt = txReceipt ?? await getTransactionReceipt(client, { hash })
  const messages: MessagePassedEvent[] = []
  for (const log of receipt.logs) {
    /// These transactions will contain events from several contracts
    /// this decode will revert for events not from l2ToL1MessagePasserABI
    /// we are OK ignoring these events
    try {
      const event = decodeEventLog({
        abi: l2ToL1MessagePasserABI,
        data: log.data,
        topics: log.topics,
      })
      if (event.eventName === 'MessagePassed') {
        messages.push(event.args)
      }
    } catch {}
  }
  return { messages, blockNumber: receipt.blockNumber }
}
