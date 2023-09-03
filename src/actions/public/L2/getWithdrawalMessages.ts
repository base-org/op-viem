import { l2ToL1MessagePasserABI } from "@eth-optimism/contracts-ts";
import { Address, Chain, decodeEventLog, Hash, Hex, type PublicClient, Transport } from "viem";

export type MessagePassedEvent = {
  nonce: bigint;
  sender: Address;
  target: Address;
  value: bigint;
  gasLimit: bigint;
  data: Hex;
  withdrawalHash: Hex;
};

export type GetWithdrawalMessagesParameters = {
  hash: Hash;
};

export type GetWithdrawalMessagesReturnType = {
  messages: MessagePassedEvent[];
  blockNumber: bigint;
};

/**
 * Retrieves all MessagePassed events from a withdrawal transaction
 *
 * @param client - Public client to use
 * @param {GetWithdrawalMessagesParameters} parameters - {@link GetWithdrawalMessagesParameters}
 * @returns {GetWithdrawalMessagesReturnType} An array of all MessagePassed events emitted in this transaction. {@link GetWithdrawalMessagesReturnType}
 */
export async function getWithdrawalMessages<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { hash }: GetWithdrawalMessagesParameters,
): Promise<GetWithdrawalMessagesReturnType> {
  const receipt = await client.getTransactionReceipt({ hash });
  const messages: MessagePassedEvent[] = [];
  for (const log of receipt.logs) {
    /// These transactions will contain events from several contracts
    /// this decode will revert for events not from l2ToL1MessagePasserABI
    /// we are OK ignoring these events
    try {
      const event = decodeEventLog({
        abi: l2ToL1MessagePasserABI,
        data: log.data,
        topics: log.topics,
      });
      if (event.eventName === "MessagePassed") {
        messages.push(event.args);
      }
    } catch {}
  }
  return { messages, blockNumber: receipt.blockNumber };
}
