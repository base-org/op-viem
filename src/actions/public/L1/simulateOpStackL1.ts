import { Chain } from 'viem'
import { Abi, Address, PublicClient, Transport } from 'viem'
import { simulateContract, SimulateContractParameters, SimulateContractReturnType } from 'viem/actions'
import { L1ChainMismatchError, L2ChainOrAddressError } from '../../../../errors/action'
import { GetL2Chain, ResolveChain } from '../../../types/actions'
import { OpStackL1Contract } from '../../../types/opStackContracts'

export type SimulateOpStackL1Parameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> =
  & { contract: OpStackL1Contract; chain: TChain | TChainOverride }
  & ({
    l2Chain: GetL2Chain<ResolveChain<TChain, TChainOverride>>
    address?: never
  } | {
    l2Chain?: never
    address: Address
  })
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
    l2Chain,
    contract,
    address,
    chain = client.chain,
    ...rest
  }: SimulateOpStackL1Parameters<TChain, TChainOverride, TAbi, TFunctionName>,
): Promise<SimulateContractReturnType<TAbi, TFunctionName, TChain, TChainOverride>> {
  if (l2Chain && l2Chain.opStackConfig.l1.chainId !== chain?.id) {
    throw new L1ChainMismatchError({ chainId: chain?.id, opChainL1ChainId: l2Chain.opStackConfig.l1.chainId })
  }
  if (!l2Chain && !address) {
    throw new L2ChainOrAddressError({ contract })
  }
  const resolvedAddress = address ?? l2Chain.opStackConfig.l1.contracts[contract].address
  return simulateContract(client, {
    address: resolvedAddress,
    ...rest,
  } as unknown as SimulateContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TChainOverride
  >)
}
