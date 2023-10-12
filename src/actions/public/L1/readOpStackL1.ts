import type { Abi, Address, Chain, Client, ReadContractParameters, ReadContractReturnType, Transport } from 'viem'
import { readContract } from 'viem/actions'

export type ReadOpStackL1Parameters<
  TChain extends Chain | undefined = Chain,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> =
  & { chain: TChain; address: Address }
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
    address,
    ...rest
  }: ReadOpStackL1Parameters<TChain, TAbi, TFunctionName>,
): Promise<ReadContractReturnType<TAbi, TFunctionName>> {
  return readContract(client, {
    address,
    ...rest,
  } as unknown as ReadContractParameters<TAbi, TFunctionName>)
}
