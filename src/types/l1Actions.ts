import type {
  Abi,
  Account,
  Address,
  Chain,
  ContractFunctionArgs,
  ContractFunctionName,
  SimulateContractParameters,
  WriteContractParameters,
} from 'viem'

export type L1WriteActionBaseType<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ContractFunctionName<
    TAbi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
  TArgs extends ContractFunctionArgs<
    TAbi,
    'nonpayable' | 'payable',
    TFunctionName
  > = ContractFunctionArgs<TAbi, 'nonpayable' | 'payable', TFunctionName>,
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<TAbi, TFunctionName, TArgs, TChain, TAccount, TChainOverride>,
  'abi' | 'functionName' | 'args' | 'address'
>

export type L1SimulateActionBaseType<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctioName extends ContractFunctionName<
    TAbi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
  TArgs extends ContractFunctionArgs<
    TAbi,
    'nonpayable' | 'payable',
    TFunctioName
  > = ContractFunctionArgs<TAbi, 'nonpayable' | 'payable', TFunctioName>,
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAccountOverride extends Account | Address | undefined = undefined,
> = Omit<
  SimulateContractParameters<TAbi, TFunctioName, TArgs, TChain, TChainOverride, TAccountOverride>,
  'abi' | 'functionName' | 'args' | 'address'
>
