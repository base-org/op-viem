import type { Abi, Address, Chain, PublicClient, Transport } from 'viem'
import { simulateContract, type SimulateContractParameters, type SimulateContractReturnType } from 'viem/actions'

export type SimulateOpStackL1Parameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> =
  & { chain: TChain | TChainOverride; address: Address }
  & Omit<
    SimulateContractParameters<
      TAbi,
      TFunctionName,
      TChain,
      TChainOverride
    >,
    'address' | 'chain'
  >

export function simulateOpStackL1<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
  const TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
>(
  client: PublicClient<Transport, TChain>,
  {
    address,
    ...rest
  }: SimulateOpStackL1Parameters<TChain, TChainOverride, TAbi, TFunctionName>,
): Promise<SimulateContractReturnType<TAbi, TFunctionName, TChain, TChainOverride>> {
  return simulateContract(client, {
    address,
    ...rest,
  } as unknown as SimulateContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TChainOverride
  >)
}
