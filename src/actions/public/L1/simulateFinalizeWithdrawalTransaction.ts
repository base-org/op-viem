import type { Chain, PublicClient, SimulateContractReturnType, Transport } from 'viem'
import { type L1SimulateActionBaseType } from '../../../types/l1Actions.js'
import {
  ABI,
  CONTRACT,
  type FinalizeWithdrawalTransactionParameters,
  FUNCTION,
} from '../../wallet/L1/writeFinalizeWithdrawalTransaction.js'
import { simulateOpStackL1, type SimulateOpStackL1Parameters } from './simulateOpStackL1.js'

export type SimulateFinalizeWithdrawalTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { withdrawal: FinalizeWithdrawalTransactionParameters }
  & L1SimulateActionBaseType<
    TChain,
    TChainOverride,
    typeof ABI,
    typeof CONTRACT,
    typeof FUNCTION
  >

export type SimulateFinalizeWithdrawalTransactionReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof ABI,
  typeof FUNCTION,
  TChain,
  TChainOverride
>

/**
 * Simulates a call to finalizeWithdrawalTranasction on the OptimismPortal contract.
 *
 * @param parameters - {@link SimulateFinalizeWithdrawalTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateFinalizeWithdrawalTransaction<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    withdrawal,
    optimismPortalAddress,
    ...rest
  }: SimulateFinalizeWithdrawalTransactionParameters<
    TChain,
    TChainOverride
  >,
): Promise<SimulateFinalizeWithdrawalTransactionReturnType<TChain, TChainOverride>> {
  return simulateOpStackL1(client, {
    address: optimismPortalAddress,
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [withdrawal],
    ...rest,
  } as unknown as SimulateOpStackL1Parameters<
    TChain,
    TChainOverride,
    typeof ABI,
    typeof FUNCTION
  >)
}
