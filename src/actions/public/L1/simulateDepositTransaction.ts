import type { Chain, PublicClient, SimulateContractParameters, SimulateContractReturnType, Transport } from 'viem'
import { simulateContract } from 'viem/actions'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { type L1SimulateActionBaseType } from '../../../types/l1Actions.js'
import { ABI, type DepositTransactionParameters, FUNCTION } from '../../wallet/L1/writeDepositTransaction.js'

export type SimulateDepositTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: DepositTransactionParameters; portal: RawOrContractAddress<_chainId> }
  & L1SimulateActionBaseType<
    TChain,
    TChainOverride,
    typeof ABI,
    typeof FUNCTION
  >

export type SimulateDepositTransactionReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof ABI,
  typeof FUNCTION,
  TChain,
  TChainOverride
>

/**
 * Simulates a call to DepositTranasction on the OptimismPortal contract.
 *
 * @param parameters - {@link SimulateDepositTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateDepositTransaction<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { to, value = 0n, gasLimit, isCreation = false, data = '0x' },
    portal,
    ...rest
  }: SimulateDepositTransactionParameters<
    TChain,
    TChainOverride
  >,
): Promise<SimulateDepositTransactionReturnType<TChain, TChainOverride>> {
  return simulateContract(client, {
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [to, value, gasLimit, isCreation, data],
    ...rest,
  } as unknown as SimulateContractParameters<
    typeof ABI,
    typeof FUNCTION,
    TChain,
    TChainOverride
  >)
}
