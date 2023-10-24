import type { Chain, PublicClient, SimulateContractParameters, SimulateContractReturnType, Transport } from 'viem'
import { simulateContract } from 'viem/actions'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { type L1SimulateActionBaseType } from '../../../types/l1Actions.js'
import {
  ABI,
  FUNCTION,
  type ProveWithdrawalTransactionParameters,
} from '../../wallet/L1/writeProveWithdrawalTransaction.js'

export type SimulateProveWithdrawalTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: ProveWithdrawalTransactionParameters; portal: RawOrContractAddress<_chainId> }
  & L1SimulateActionBaseType<
    TChain,
    TChainOverride,
    typeof ABI,
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
    portal,
    ...rest
  }: SimulateProveWithdrawalTransactionParameters<
    TChain,
    TChainOverride
  >,
): Promise<SimulateProveWithdrawalTransactionReturnType<TChain, TChainOverride>> {
  return simulateContract(client, {
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [withdrawalTransaction, L2OutputIndex, outputRootProof, withdrawalProof],
    ...rest,
  } as unknown as SimulateContractParameters<
    typeof ABI,
    typeof FUNCTION,
    TChain,
    TChainOverride
  >)
}
