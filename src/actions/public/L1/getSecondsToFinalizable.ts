import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import type { Chain, PublicClient, Transport } from 'viem'
import type { MessagePassedEvent } from '../../../index.js'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import { readOpStackL1, type ReadOpStackL1Parameters } from './readOpStackL1.js'
import { readProvenWithdrawals } from './readProvenWithdrawals.js'

const ABI = l2OutputOracleABI
const CONTRACT = OpStackL1Contract.L2OutputOracle

export type GetSecondsToFinalizableParameters<
  TChain extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> = {
  withdrawalHash: MessagePassedEvent['withdrawalHash']
  optimismPortal: RawOrContractAddress<_chainId>
  l2OutputOracle: RawOrContractAddress<_chainId>
}

export async function getSecondsToFinalizable<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    withdrawalHash,
    l2OutputOracle,
    optimismPortal,
  }: GetSecondsToFinalizableParameters,
): Promise<bigint> {
  const provenWithdrawal = await readProvenWithdrawals(client, {
    optimismPortal: resolveAddress(optimismPortal),
    withdrawalHash,
  })

  const finalizationPeriod = await readOpStackL1(client, {
    contract: CONTRACT,
    abi: l2OutputOracleABI,
    functionName: 'FINALIZATION_PERIOD_SECONDS',
    address: resolveAddress(l2OutputOracle),
  } as ReadOpStackL1Parameters<TChain, typeof ABI, 'FINALIZATION_PERIOD_SECONDS'>)

  const timeSinceProven = BigInt(Date.now()) / 1000n - provenWithdrawal.timestamp

  const finalizable = finalizationPeriod - timeSinceProven

  // NOTE(Wilson): No negative numbers, does not make sense to have negative seconds until finalizable
  return finalizable < 0n ? 0n : finalizable
}
