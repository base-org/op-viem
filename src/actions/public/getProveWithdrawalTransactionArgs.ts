import { Block, Chain, Hex, PublicClient, Transport, toHex } from 'viem'
import { getWithdrawalMessages } from './getWithdrawalMessages'
import { getProof } from './getProof'
import { hashMessageHash } from '../../utils/hashMessageHash'
import { getBlock } from 'viem/actions'

const l2ToL1MessagePasserAddress = '0x4200000000000000000000000000000000000016'

export async function getProveWithdrawalTransactionsArgs<
  TChain extends Chain | undefined,
>(client: PublicClient<Transport, TChain>, { hash }: { hash: Hex }) {
  const l2Messages = await getWithdrawalMessages(client, { hash })
  for (const m of l2Messages.events) {
    const slot = hashMessageHash(m.withdrawalHash)
    const proof = await getProof(client, {
      address: l2ToL1MessagePasserAddress,
      storageKeys: [slot],
      block: toHex(l2Messages.blockNumber),
    })
    let output: { l2OutputIndex: bigint; l2BlockNumber: bigint } // getMessageBedrockOutput
    let l2OutputBlock = await getBlock(client, {
      blockNumber: output.l2BlockNumber,
    })
    const args = {
      outputRootProof: {
        version: 0n,
        stateRoot: l2OutputBlock.stateRoot,
        messagePasserStorageRoot: proof.storageHash,
        latestBlockhash: l2OutputBlock.hash,
      },
      withdrawalProof: proof.storageProof,
      l2OutputIndex: output.l2OutputIndex,
    }
  }
}
