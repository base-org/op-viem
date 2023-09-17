import { type Chain, type Hex, type PublicClient, type Transport } from 'viem'
import { getBlock } from 'viem/actions'
import { opStackL2ChainContracts } from '../../../index.js'
import type { MessagePassedEvent } from '../../../types/withdrawal.js'
import { getWithdrawalMessageStorageSlot } from '../../../utils/getWithdrawalMessageStorageSlot.js'
import { getProof } from '../getProof.js'
import type { GetOutputForL2BlockReturnType } from '../L1/getOutputForL2Block.js'

export type OutputRootProof = {
  version: Hex
  stateRoot: Hex
  messagePasserStorageRoot: Hex
  latestBlockhash: Hex
}
const OUTPUT_ROOT_PROOF_VERSION = '0x0000000000000000000000000000000000000000000000000000000000000000'

export type GetProveWithdrawalTransactionArgsParams = {
  message: MessagePassedEvent
  output: GetOutputForL2BlockReturnType
}

export type GetProveWithdrawalTransactionArgsReturnType = {
  withdrawalTransaction: Omit<MessagePassedEvent, 'withdrawalHash'>
  L2OutputIndex: bigint
  outputRootProof: OutputRootProof
  withdrawalProof: Hex[]
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
    address: opStackL2ChainContracts.l2ToL1MessagePasser.address,
    storageKeys: [slot],
    block: block.hash,
  })
  // rome-ignore lint: ok unused variable
  const { withdrawalHash, ...withdrawalTransaction } = message
  return {
    withdrawalTransaction,
    outputRootProof: {
      version: OUTPUT_ROOT_PROOF_VERSION,
      stateRoot: block.stateRoot,
      messagePasserStorageRoot: proof.storageHash,
      latestBlockhash: block.hash,
    },
    withdrawalProof: proof.storageProof[0].proof,
    L2OutputIndex: output.outputIndex,
  }
}
