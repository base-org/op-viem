import type {
  Abi,
  Account,
  Chain,
  ContractFunctionArgs,
  ContractFunctionName,
  SimulateContractParameters,
  WriteContractParameters,
} from 'viem'

export type L2WriteContractParameters<
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
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<TAbi, TFunctioName, TArgs, TChain, TAccount, TChainOverride>,
  'abi' | 'functionName' | 'args' | 'address'
>

export type L2SimulateContractParameters<
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
> = Omit<
  SimulateContractParameters<TAbi, TFunctioName, TArgs, TChain, TChainOverride>,
  'abi' | 'functionName' | 'args' | 'address'
>
