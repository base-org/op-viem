import { type Chain, type Hex, type PublicClient, toHex, type Transport } from 'viem'
import { getBlock } from 'viem/actions'
import { getWithdrawalMessageStorageSlot } from '../../../utils/getWithdrawalMessageStorageSlot.js'
import { getProof } from '../getProof.js'
import type { GetOutputForL2BlockReturnType } from '../L1/getOutputForL2Block.js'
import type { MessagePassedEvent } from './getWithdrawalMessages.js'

export type OutputRootProof = {
  version: Hex
  stateRoot: Hex
  messagePasserStorageRoot: Hex
  latestBlockhash: Hex
}

const L2_TO_L1_MESSAGE_PASSER = '0x4200000000000000000000000000000000000016'
const OUTPUT_ROOT_PROOF_VERSION = 0n

export type GetProveWithdrawalTransactionArgsParams = {
  message: MessagePassedEvent
  output: GetOutputForL2BlockReturnType
}

export type GetProveWithdrawalTransactionArgsReturnType = {
  withdrawalTransaction: Omit<MessagePassedEvent, 'withdrawalHash'>
  outputRootProof: OutputRootProof
  withdrawalProof: Hex[]
  L2OutputIndex: bigint
}

/**
 * For a given L2 message and output proposal, generates the args needed to call proveWithdrawalTransaction
 * on the OptimismPortal contract
 *
 * @param {MessagePassedEvent} message the MessagePassed event emitted from the withdrawal transaction
 * @param {GetOutputForL2BlockReturnType} output the output proposal and index for the L2 block that contained the withdrawal transaction
 * @returns {getProveWithdrawalTransactionArgsReturnType} The arguments required by proveWithdrawalTransaction
 */
export async function getProveWithdrawalTransactionArgs<
  TChain extends Chain | undefined,
>(
  client: PublicClient<Transport, TChain>,
  { message, output }: GetProveWithdrawalTransactionArgsParams,
): Promise<GetProveWithdrawalTransactionArgsReturnType> {
  const slot = getWithdrawalMessageStorageSlot(message.withdrawalHash)
  const block = await getBlock(client, {
    blockNumber: output.proposal.l2BlockNumber,
  })
  if (!block.hash) {
    throw new Error(
      `Block not found for block number ${output.proposal.l2BlockNumber}`,
    )
  }
  const proof = await getProof(client, {
    address: L2_TO_L1_MESSAGE_PASSER,
    storageKeys: [slot],
    block: block.hash,
  })
  // rome-ignore lint: ok unused variable
  const { withdrawalHash, ...withdrawalTransaction } = message
  return {
    withdrawalTransaction,
    outputRootProof: {
      version: toHex(OUTPUT_ROOT_PROOF_VERSION),
      stateRoot: block.stateRoot,
      messagePasserStorageRoot: proof.storageHash,
      latestBlockhash: block.hash,
    },
    withdrawalProof: proof.storageProof[0].proof,
    L2OutputIndex: output.outputIndex,
  }
}
