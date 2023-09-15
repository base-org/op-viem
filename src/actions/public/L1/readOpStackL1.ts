import type { Abi, Address, Chain, PublicClient, ReadContractParameters, ReadContractReturnType, Transport } from 'viem'
import { readContract } from 'viem/actions'
import { L1ChainMismatchError, L2ChainOrAddressError } from '../../../errors/action.js'
import type { GetL2Chain } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'

export type ReadOpStackL1Parameters<
  TChain extends Chain | undefined = Chain,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> =
  & { contract: OpStackL1Contract; chain: TChain }
  & ({
    l2Chain: GetL2Chain<TChain>
    address?: never
  } | {
    l2Chain?: never
    address: Address
  })
  & Omit<
    ReadContractParameters<
      TAbi,
      TFunctionName
    >,
    'address'
  >

export function readOpStackL1<
  TChain extends Chain | undefined,
  const TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(
  client: PublicClient<Transport, TChain>,
  {
    l2Chain,
    contract,
    address,
    chain = client.chain,
    ...rest
  }: ReadOpStackL1Parameters<TChain, TAbi, TFunctionName>,
): Promise<ReadContractReturnType<TAbi, TFunctionName>> {
  if (l2Chain && l2Chain.opStackConfig.l1.chainId !== chain?.id) {
    throw new L1ChainMismatchError({ chainId: chain?.id, opChainL1ChainId: l2Chain.opStackConfig.l1.chainId })
  }
  if (!address && (!l2Chain || !l2Chain.opStackConfig.l1.contracts[contract])) {
    throw new L2ChainOrAddressError({ contract })
  }
  const resolvedAddress = address ?? l2Chain.opStackConfig.l1.contracts[contract].address
  return readContract(client, {
    address: resolvedAddress,
    ...rest,
  } as unknown as ReadContractParameters<TAbi, TFunctionName>)
}
