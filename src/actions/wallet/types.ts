import { Chain, Account, Abi, WriteContractParameters } from 'viem'
import { OpChainL2 } from '@roninjin10/rollup-chains'

export type WalletRollupActionType<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TRollupChain extends OpChainL2 = OpChainL2,
  TChain extends Chain & { id: TRollupChain['l1']['id'] } = TRollupChain['l1'],
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >,
  'abi' | 'functionName' | 'args' | 'address'
> & {
  TAbi: TAbi
  TFunctionName: TFunctionName
  TChain: TChain
  TRollupChain: TRollupChain
  TAccount: TAccount
  TChainOverride: TChainOverride
}
