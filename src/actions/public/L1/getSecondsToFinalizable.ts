import { l2OutputOracleABI } from '@eth-optimism/contracts-ts'
import type { Address, Chain, PublicClient, Transport } from 'viem'
import type { MessagePassedEvent } from '../../../index.js'
import type { GetL2Chain, L1ActionBaseType } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import {
  resolveL1OpStackContractAddress,
  type ResolveL1OpStackContractAddressParameters,
} from '../../../utils/resolveL1OpStackContractAddress.js'
import { readOpStackL1, type ReadOpStackL1Parameters } from './readOpStackL1.js'
import { readProvenWithdrawals } from './readProvenWithdrawals.js'

const ABI = l2OutputOracleABI
const CONTRACT = OpStackL1Contract.L2OutputOracle

export type GetSecondsToFinalizableParameters<
  TChain extends Chain | undefined = Chain,
> =
  & { withdrawalHash: MessagePassedEvent['withdrawalHash']; optimismPortalAddress?: Address }
  & L1ActionBaseType<
    GetL2Chain<TChain>,
    typeof CONTRACT
  >

export async function getSecondsToFinalizable<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    withdrawalHash,
    l2OutputOracleAddress,
    optimismPortalAddress,
    l2Chain,
  }: GetSecondsToFinalizableParameters<TChain>,
): Promise<bigint> {
  const resolvedPortalAddress = resolveL1OpStackContractAddress(
    {
      l2Chain,
      chain: client.chain,
      contract: OpStackL1Contract.OptimismPortal,
      address: optimismPortalAddress,
    } as ResolveL1OpStackContractAddressParameters<TChain>,
  )
  const provenWithdrawal = await readProvenWithdrawals(client, {
    optimismPortalAddress: resolvedPortalAddress,
    withdrawalHash,
  })

  const finalizationPeriod = await readOpStackL1(client, {
    contract: OpStackL1Contract.L2OutputOracle,
    abi: l2OutputOracleABI,
    functionName: 'FINALIZATION_PERIOD_SECONDS',
    l2Chain,
    address: l2OutputOracleAddress,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, 'FINALIZATION_PERIOD_SECONDS'>)

  const timeSinceProven = BigInt(Date.now()) / 1000n - provenWithdrawal.timestamp

  const finalizable = finalizationPeriod - timeSinceProven

  // NOTE(Wilson): No negative numbers, does not make sense to have negative seconds until finalizable
  return finalizable < 0n ? 0n : finalizable
}
