import type {
  Abi,
  Account,
  Address,
  Chain,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'
import type { GetL2Chain, ResolveChain } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import {
  resolveL1OpStackContractAddress,
  type ResolveL1OpStackContractAddressParameters,
} from '../../../utils/resolveL1OpStackContractAddress.js'

export type WriteOpStackL1Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
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
    WriteContractParameters<
      TAbi,
      TFunctionName,
      TChain,
      TAccount,
      TChainOverride
    >,
    'address' | 'chain'
  >

export function writeOpStackL1<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
  const TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    l2Chain,
    contract,
    address,
    chain = client.chain,
    ...rest
  }: WriteOpStackL1Parameters<TChain, TAccount, TChainOverride, TAbi, TFunctionName>,
): Promise<WriteContractReturnType> {
  const resolvedAddress = resolveL1OpStackContractAddress(
    { l2Chain, chain, contract, address } as ResolveL1OpStackContractAddressParameters<TChain, TChainOverride>,
  )
  return writeContract(client, {
    address: resolvedAddress,
    ...rest,
  } as unknown as WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >)
}
