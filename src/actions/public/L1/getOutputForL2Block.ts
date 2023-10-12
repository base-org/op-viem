import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import type { Chain, Hex, PublicClient, Transport } from 'viem'
import { readContract } from 'viem/actions'
import type { RawOrContractAddress } from '../../../types/addresses.js'

export type Proposal = {
  outputRoot: Hex
  timestamp: bigint
  l2BlockNumber: bigint
}

export type GetOutputForL2BlockParameters<
  chain extends Chain | undefined = Chain | undefined,
  _chainId = chain extends Chain ? chain['id'] : number,
> = { l2BlockNumber: bigint; l2OutputOracle: RawOrContractAddress<_chainId> }

export type GetOutputForL2BlockReturnType = {
  proposal: Proposal
  outputIndex: bigint
}

/**
 * Calls to the L2OutputOracle contract on L1 to get the output for a given L2 block
 *
 * @param {bigint} blockNumber the L2 block number to get the output for
 * @param {OpChainL2} rollup the L2 chain
 * @returns {GetOutputForL2BlockReturnType} Output proposal and index for the L2 block
 */
export async function getOutputForL2Block<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    l2BlockNumber,
    l2OutputOracle,
  }: GetOutputForL2BlockParameters<TChain>,
): Promise<GetOutputForL2BlockReturnType> {
  const resolvedAddress = typeof l2OutputOracle === 'string' ? l2OutputOracle : l2OutputOracle.address
  const outputIndex = await readContract(client, {
    address: resolvedAddress,
    abi: l2OutputOracleABI,
    functionName: 'getL2OutputIndexAfter',
    args: [l2BlockNumber],
  })

  const proposal = await readContract(client, {
    address: resolvedAddress,
    abi: l2OutputOracleABI,
    functionName: 'getL2Output',
    args: [outputIndex],
  })

  return { proposal, outputIndex }
}
