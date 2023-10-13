import type { Abi, Account, Chain, SendTransactionParameters, SimulateContractParameters } from 'viem'

export type L1WriteActionBaseType<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SendTransactionParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
  'chain'
>

export type L1SimulateActionBaseType<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctioName extends string = string,
> = Omit<
  SimulateContractParameters<TAbi, TFunctioName, TChain, TChainOverride>,
  'abi' | 'functionName' | 'args' | 'address'
>
