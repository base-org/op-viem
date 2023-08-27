import { Chain, Hex, PublicClient, Transport } from 'viem'
import { getWithdrawalMessages } from './getWithdrawalMessages'
import { getBlock } from 'viem/actions'
import { getProofsForWithdrawal } from './getProofsForWithdrawal'

export async function getProveWithdrawalTransactionsArgs<
  TChain extends Chain | undefined,
>(client: PublicClient<Transport, TChain>, { hash }: { hash: Hex }) {
  const withdrawalMessages = await getWithdrawalMessages(client, { hash })
  const block = await getBlock(client, {
    blockHash: withdrawalMessages.blockHash,
  })
  const results = []
  for (const message of withdrawalMessages.messages) {
    results.push(
      await getProofsForWithdrawal(client, {
        message,
        blockStateRoot: block.stateRoot,
        blockHash: withdrawalMessages.blockHash,
      }),
    )
  }
  return results
}

// let l2OutputIndex: bigint // L1 client.call L2OutputOracle getL2OutputIndexAfter
