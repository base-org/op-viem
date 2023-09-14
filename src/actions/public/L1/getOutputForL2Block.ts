import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import type { Chain, Hex, PublicClient, Transport } from 'viem'
import { readContract } from 'viem/actions'
import { L1ChainMismatchError, L2ChainOrAddressError } from '../../../errors/action.js'
import type { GetL2Chain, L1ActionBaseType } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'

const CONTRACT = OpStackL1Contract.L2OutputOracle

export type Proposal = {
  outputRoot: Hex
  timestamp: bigint
  l2BlockNumber: bigint
}

export type GetOutputForL2BlockParameters<
  TChain extends Chain | undefined = Chain,
> =
  & { l2BlockNumber: bigint }
  & L1ActionBaseType<
    GetL2Chain<TChain>,
    typeof CONTRACT
  >

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
    l2Chain,
    l2OutputOracleAddress,
  }: GetOutputForL2BlockParameters<TChain>,
): Promise<GetOutputForL2BlockReturnType> {
  if (l2Chain && l2Chain.opStackConfig.l1.chainId !== client.chain?.id) {
    throw new L1ChainMismatchError({ chainId: client.chain?.id, opChainL1ChainId: l2Chain.opStackConfig.l1.chainId })
  }
  if (!l2OutputOracleAddress && (!l2Chain || !l2Chain.opStackConfig.l1.contracts[CONTRACT])) {
    throw new L2ChainOrAddressError({ contract: CONTRACT })
  }
  const resolvedAddress = l2OutputOracleAddress ?? l2Chain.opStackConfig.l1.contracts[CONTRACT].address
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
