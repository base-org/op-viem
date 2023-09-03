import { Chain, Hash, type PublicClient, Transport } from "viem";
import { getDepositEventsInfoFromTxReceipt } from "../../../utils/getDepositEventsInfoFromTxReceipt";
import { getL2HashFromL1DepositInfo } from "../../../utils/getL2HashFromL1DepositInfo";

export type GetL2HashesForDepositTxParamters = {
  l1TxHash: Hash;
};

export type GetL2HashesForDepositTxReturnType = Hash[];

/**
 * Gets the L2 transaction hashes for a given L1 deposit transaction
 *
 * @param {Hash} l1TxHash the L1 transaction hash of the deposit
 * @returns {GetL2HashesForDepositTxReturnType} the L2 transaction hashes for the deposit
 */
export async function getL2HashesForDepositTx<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { l1TxHash }: GetL2HashesForDepositTxParamters,
): Promise<GetL2HashesForDepositTxReturnType> {
  const receipt = await client.getTransactionReceipt({ hash: l1TxHash });
  const depositEvents = getDepositEventsInfoFromTxReceipt({ receipt });

  return depositEvents.map(({ event, logIndex }) =>
    getL2HashFromL1DepositInfo({
      event,
      logIndex,
      blockHash: receipt.blockHash,
    })
  );
}
