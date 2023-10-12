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
import { OpStackL1Contract } from '../../../types/opStackContracts.js'

export type WriteOpStackL1Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> =
  & { contract: OpStackL1Contract; chain: TChain | TChainOverride; address: Address }
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
    address,
    ...rest
  }: WriteOpStackL1Parameters<TChain, TAccount, TChainOverride, TAbi, TFunctionName>,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address,
    ...rest,
  } as unknown as WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >)
}
