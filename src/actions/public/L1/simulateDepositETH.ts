import type { Chain, PublicClient, SimulateContractParameters, SimulateContractReturnType, Transport } from 'viem'
import { simulateContract } from 'viem/actions'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { ABI, type DepositETHParameters, FUNCTION } from '../../../types/depositETH.js'
import type { L1SimulateActionBaseType } from '../../../types/l1Actions.js'

export type SimulateDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: DepositETHParameters; portal: RawOrContractAddress<_chainId> }
  & Omit<L1SimulateActionBaseType<TChain, TChainOverride, typeof ABI, typeof FUNCTION>, 'value'>

export type SimulateDepositETHReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<typeof ABI, typeof FUNCTION, TChain, TChainOverride>

/**
 * Simulates a deposit of ETH to L2
 * @param parameters - {@link SimulateDepositETHParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateDepositETH<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { to, gasLimit, data = '0x', amount },
    portal,
    ...rest
  }: SimulateDepositETHParameters<TChain, TChainOverride>,
): Promise<SimulateDepositETHReturnType<TChain, TChainOverride>> {
  return simulateContract(client, {
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [to, amount, gasLimit, false, data],
    value: amount,
    ...rest,
  } as unknown as SimulateContractParameters<typeof ABI, typeof FUNCTION, TChain, TChainOverride>)
}
