import type { Abi, Address, Chain, Client, ReadContractParameters, ReadContractReturnType, Transport } from 'viem'
import { readContract } from 'viem/actions'
import type { GetL2Chain } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import {
  resolveL1OpStackContractAddress,
  type ResolveL1OpStackContractAddressParameters,
} from '../../../utils/resolveL1OpStackContractAddress.js'

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
  client: Client<Transport, TChain>,
  {
    l2Chain,
    contract,
    address,
    chain = client.chain,
    ...rest
  }: ReadOpStackL1Parameters<TChain, TAbi, TFunctionName>,
): Promise<ReadContractReturnType<TAbi, TFunctionName>> {
  const resolvedAddress = resolveL1OpStackContractAddress(
    { l2Chain, chain, contract, address } as ResolveL1OpStackContractAddressParameters<TChain>,
  )
  return readContract(client, {
    address: resolvedAddress,
    ...rest,
  } as unknown as ReadContractParameters<TAbi, TFunctionName>)
}
