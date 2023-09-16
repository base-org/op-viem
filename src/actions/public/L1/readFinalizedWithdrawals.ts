import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Chain, PublicClient, Transport } from 'viem'
import type { MessagePassedEvent } from '../../../index.js'
import type { GetL2Chain, L1ActionBaseType } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import { readOpStackL1, type ReadOpStackL1Parameters } from './readOpStackL1.js'

const ABI = optimismPortalABI
const CONTRACT = OpStackL1Contract.OptimismPortal
const FUNCTION_NAME = 'finalizedWithdrawals'

export type ReadFinalizedWithdrawalsParameters<
  TChain extends Chain | undefined = Chain,
> =
  & { withdrawalHash: MessagePassedEvent['withdrawalHash'] }
  & L1ActionBaseType<
    GetL2Chain<TChain>,
    typeof CONTRACT
  >

export async function readFinalizedWithdrawals<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    withdrawalHash,
    optimismPortalAddress,
    l2Chain,
  }: ReadFinalizedWithdrawalsParameters<TChain>,
): Promise<boolean> {
  const finalizedWithdrawal = await readOpStackL1(client, {
    contract: CONTRACT,
    abi: ABI,
    functionName: FUNCTION_NAME,
    l2Chain,
    address: optimismPortalAddress,
    args: [withdrawalHash],
    chain: client.chain,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, typeof FUNCTION_NAME>)

  return finalizedWithdrawal
}
