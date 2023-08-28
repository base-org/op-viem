import { Chain, Hex, PublicClient, Transport, toHex } from 'viem'
import { getBlock } from 'viem/actions'
import { getWithdrawalMessageStorageSlot } from '../../utils/getWithdrawalMessageStorageSlot'
import { MessagePassedEvent } from './getWithdrawalMessages'
import { getProof } from './getProof'
import { GetOutputForL2BlockReturnType } from './getOutputForL2Block'

export type OutputRootProof = {
  version: Hex
  stateRoot: Hex
  messagePasserStorageRoot: Hex
  latestBlockhash: Hex
}

const L2_TO_L1_MESSAGE_PASSER = '0x4200000000000000000000000000000000000016'
const OUTPUT_ROOT_PROOF_VERSION = 0n

export type GetProofsForWithdrawalParams = {
  message: MessagePassedEvent
  output: GetOutputForL2BlockReturnType
}

export type GetProofsForWithdrawalReturnType = {
  withdrawalTransaction: Omit<MessagePassedEvent, 'withdrawalHash'>
  outputRootProof: OutputRootProof
  withdrawalProof: Hex[]
  L2OutputIndex: bigint
}

export async function getProveArgsForWithdrawal<
  TChain extends Chain | undefined,
>(
  client: PublicClient<Transport, TChain>,
  { message, output }: GetProofsForWithdrawalParams,
): Promise<GetProofsForWithdrawalReturnType> {
  const slot = getWithdrawalMessageStorageSlot(message.withdrawalHash)
  const block = await getBlock(client, {
    blockNumber: output.proposal.l2BlockNumber,
  })
  if (!block.hash) {
    throw new Error(
      `L2 block not found for proposa.l2BlockNumber ${output.proposal.l2BlockNumber}`,
    )
  }
  const proof = await getProof(client, {
    address: L2_TO_L1_MESSAGE_PASSER,
    storageKeys: [slot],
    block: block.hash,
  })
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
