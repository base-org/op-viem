import { Block, Chain, Hex, PublicClient, Transport } from 'viem'
import {
  MessagePassedEvent,
  getWithdrawalMessages,
} from './getWithdrawalMessages'
import { getBlock, readContract } from 'viem/actions'
import {
  GetProofsForWithdrawalReturnType,
  getProofsForWithdrawal,
} from './getProofsForWithdrawal'
import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'

export async function getProveWithdrawalTransactionsArgs<
  TChain extends Chain | undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    withdrawalMessages,
    blockNumber,
  }: { withdrawalMessages: MessagePassedEvent[]; blockNumber: bigint },
): Promise<GetProofsForWithdrawalReturnType[]> {
  const block = await getBlock(client, {
    blockNumber,
  })
  if (!block.hash) {
    return []
  }
  const results = []
  for (const message of withdrawalMessages) {
    results.push(
      await getProofsForWithdrawal(client, {
        message,
        blockStateRoot: block.stateRoot,
        blockHash: block.hash,
      }),
    )
  }
  return results
}

// let l2OutputIndex: bigint // L1 client.call L2OutputOracle getL2OutputIndexAfter
