import type { Chain, PublicClient, SimulateContractReturnType, Transport } from 'viem'
import { type L1SimulateActionBaseType } from '../../../types/l1Actions.js'
import {
  ABI,
  CONTRACT,
  FUNCTION,
  type ProveWithdrawalTransactionParameters,
} from '../../wallet/L1/writeProveWithdrawalTransaction.js'
import { simulateOpStackL1, type SimulateOpStackL1Parameters } from './simulateOpStackL1.js'

export type SimulateProveWithdrawalTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: ProveWithdrawalTransactionParameters }
  & L1SimulateActionBaseType<
    TChain,
    TChainOverride,
    typeof ABI,
    typeof CONTRACT,
    typeof FUNCTION
  >

export type SimulateProveWithdrawalTransactionReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof ABI,
  typeof FUNCTION,
  TChain,
  TChainOverride
>

/**
 * Simulates a call to proveWithdrawalTransaction on the OptimismPortal contract.
 * Is the first L1 step of a withdrawal.
 *
 * @param parameters - {@link SimulateProveWithdrawalTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateProveWithdrawalTransaction<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { withdrawalTransaction, outputRootProof, withdrawalProof, L2OutputIndex },
    optimismPortalAddress,
    ...rest
  }: SimulateProveWithdrawalTransactionParameters<
    TChain,
    TChainOverride
  >,
): Promise<SimulateProveWithdrawalTransactionReturnType<TChain, TChainOverride>> {
  return simulateOpStackL1(client, {
    address: optimismPortalAddress,
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [withdrawalTransaction, L2OutputIndex, outputRootProof, withdrawalProof],
    ...rest,
  } as unknown as SimulateOpStackL1Parameters<
    TChain,
    TChainOverride,
    typeof ABI,
    typeof FUNCTION
  >)
}
