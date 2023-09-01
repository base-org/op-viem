import { Chain, Hex, PublicClient, Transport } from 'viem'
import { readContract } from 'viem/actions'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'

export type Proposal = {
  outputRoot: Hex
  timestamp: bigint
  l2BlockNumber: bigint
}

export type GetOutputForL2BlockParameters = {
  blockNumber: bigint
  rollup: OpChainL2
}

export type GetOutputForL2BlockReturnType = {
  proposal: Proposal
  outputIndex: bigint
}

/**
 * Calls to the L2OutputOracle contract on L1 to get the output for a given L2 block
 *
 * @param blockNumber the L2 block number to get the output for
 * @param rollup the L2 chain
 * @returns Output proposal and index for the L2 block
 */
export async function getOutputForL2Block<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { blockNumber, rollup }: GetOutputForL2BlockParameters,
): Promise<GetOutputForL2BlockReturnType> {
  const outputIndex = await readContract(client, {
    // TODO fix types here
    address: rollup.opContracts.L2OutputOracleProxy,
    abi: l2OutputOracleABI,
    functionName: 'getL2OutputIndexAfter',
    args: [blockNumber],
  })

  const proposal = await readContract(client, {
    address: rollup.opContracts.L2OutputOracleProxy,
    abi: l2OutputOracleABI,
    functionName: 'getL2Output',
    args: [outputIndex],
  })

  return { proposal, outputIndex }
}
