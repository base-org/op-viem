import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import type { Chain, PublicClient, Transport } from 'viem'
import type { GetL2Chain, L1ActionBaseType } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import { readOpStackL1, type ReadOpStackL1Parameters } from './readOpStackL1.js'

const ABI = l2OutputOracleABI
const CONTRACT = OpStackL1Contract.L2OutputOracle

export type Proposal = {
  timestamp: bigint
  l2BlockNumber: bigint
}

export type GetSecondsToNextL2OutputParameters<
  TChain extends Chain | undefined = Chain,
> =
  & { latestL2BlockNumber: bigint }
  & L1ActionBaseType<
    GetL2Chain<TChain>,
    typeof CONTRACT
  >

export async function getSecondsToNextL2Output<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    latestL2BlockNumber,
    l2OutputOracleAddress,
    l2Chain,
  }: GetSecondsToNextL2OutputParameters,
): Promise<bigint> {
  const latestBlockNumber = await readOpStackL1(client, {
    contract: OpStackL1Contract.L2OutputOracle,
    abi: ABI,
    functionName: 'latestBlockNumber',
    l2Chain,
    address: l2OutputOracleAddress,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, 'latestBlockNumber'>)

  const interval = await readOpStackL1(client, {
    contract: OpStackL1Contract.L2OutputOracle,
    abi: ABI,
    functionName: 'SUBMISSION_INTERVAL',
    l2Chain,
    address: l2OutputOracleAddress,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, 'SUBMISSION_INTERVAL'>)

  const blockTime = await readOpStackL1(client, {
    contract: OpStackL1Contract.L2OutputOracle,
    abi: ABI,
    functionName: 'SUBMISSION_INTERVAL',
    l2Chain,
    address: l2OutputOracleAddress,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, 'L2_BLOCK_TIME'>)

  return (interval - ((latestBlockNumber - latestL2BlockNumber) * blockTime))
}
