import type { Abi, Account, Chain, SimulateContractParameters, WriteContractParameters } from 'viem'

export type L2WriteContractParameters<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctioName extends string = string,
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<TAbi, TFunctioName, TChain, TAccount, TChainOverride>,
  'abi' | 'functionName' | 'args' | 'address'
>

export type L2SimulateContractParameters<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctioName extends string = string,
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<TAbi, TFunctioName, TChain, TChainOverride>,
  'abi' | 'functionName' | 'args' | 'address'
>
