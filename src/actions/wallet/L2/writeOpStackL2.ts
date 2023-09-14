import type {
  Abi,
  Account,
  Chain,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'
import { opStackL2ChainContracts, OpStackL2Contract } from '../../../types/opStackContracts.js'

export type WriteOpStackL2Parameters<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { contract: OpStackL2Contract }
  & Omit<
    WriteContractParameters<
      TAbi,
      TFunctionName,
      TChain,
      TAccount,
      TChainOverride
    >,
    'address'
  >

export function writeOpStackL2<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
  const TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    contract,
    ...rest
  }: WriteOpStackL2Parameters<TAbi, TFunctionName, TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    // TODO(Wilson): consider pulling this from chain.contracts
    // so that it will have a better error if they are not on an L2 chain
    address: opStackL2ChainContracts[contract].address,
    ...rest,
  } as unknown as WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >)
}
