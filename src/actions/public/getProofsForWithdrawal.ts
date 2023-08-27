import { Chain, Hash, Hex, PublicClient, Transport, toHex } from 'viem'
import { getWithdrawalMessageStorageSlot } from '../../utils/getWithdrawalMessageStorageSlot'
import { MessagePassedEvent } from './getWithdrawalMessages'
import { StorageProof, getProof } from './getProof'

export type GetProofsForWithdrawalParams = {
  message: MessagePassedEvent
  blockStateRoot: Hex
  blockHash: Hash
}

export type OutputRootProof = {
  version: Hex
  stateRoot: Hex
  messagePasserStorageRoot: Hex
  latestBlockhash: Hex
}

export type GetProofsForWithdrawalReturnType = {
  outputRootProof: OutputRootProof
  withdrawalProof: StorageProof[]
}

const L2_TO_L1_MESSAGE_PASSER = '0x4200000000000000000000000000000000000016'
const OUTPUT_ROOT_PROOF_VERSION = 0n

export async function getProofsForWithdrawal<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { message, blockStateRoot, blockHash }: GetProofsForWithdrawalParams,
): Promise<GetProofsForWithdrawalReturnType> {
  const slot = getWithdrawalMessageStorageSlot(message.withdrawalHash)
  const proof = await getProof(client, {
    address: L2_TO_L1_MESSAGE_PASSER,
    storageKeys: [slot],
    block: blockHash,
  })
  return {
    outputRootProof: {
      version: toHex(OUTPUT_ROOT_PROOF_VERSION),
      stateRoot: blockStateRoot,
      messagePasserStorageRoot: proof.storageHash,
      latestBlockhash: blockHash,
    },
    withdrawalProof: proof.storageProof,
  }
}
