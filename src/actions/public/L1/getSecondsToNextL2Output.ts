import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import type { Chain, PublicClient, Transport } from 'viem'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import { readOpStackL1, type ReadOpStackL1Parameters } from './readOpStackL1.js'

const ABI = l2OutputOracleABI
const CONTRACT = OpStackL1Contract.L2OutputOracle

export type GetSecondsToNextL2OutputParameters<
  TChain extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> = { latestL2BlockNumber: bigint; l2OutputOracle: RawOrContractAddress<_chainId> }

export async function getSecondsToNextL2Output<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    latestL2BlockNumber,
    l2OutputOracle,
  }: GetSecondsToNextL2OutputParameters<TChain>,
): Promise<bigint> {
  const address = resolveAddress(l2OutputOracle)
  const latestBlockNumber = await readOpStackL1(client, {
    contract: CONTRACT,
    abi: ABI,
    functionName: 'latestBlockNumber',
    address,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, 'latestBlockNumber'>)

  const interval = await readOpStackL1(client, {
    contract: CONTRACT,
    abi: ABI,
    functionName: 'SUBMISSION_INTERVAL',
    address,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, 'SUBMISSION_INTERVAL'>)

  const blockTime = await readOpStackL1(client, {
    contract: CONTRACT,
    abi: ABI,
    functionName: 'L2_BLOCK_TIME',
    address,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, 'L2_BLOCK_TIME'>)

  const blocksTillUpdate = interval - (latestL2BlockNumber - latestBlockNumber)
  // NOTE(Wilson): incase there is some problem
  // e.g. output posting has stalled or the wrong latestL2BlockNumber is passed
  // we do not return a negative number, as negative seconds to next output
  // does not make sense
  return blocksTillUpdate < 0n ? 0n : blocksTillUpdate * blockTime
}
