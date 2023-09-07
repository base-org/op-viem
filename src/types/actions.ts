import { Abi, Account, Address, Chain, SimulateContractParameters, WriteContractParameters } from 'viem'
import { OpStackChain } from './opStackChain'
import { OpStackL1Contract } from './opStackContracts'
import { IsUndefined } from 'viem/dist/types/types/utils'

export type ResolveChain<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = TChainOverride extends Chain ? TChainOverride : TChain

export type ActionBaseType<
  TL2Chain extends OpStackChain,
  TContract extends OpStackL1Contract,
> =
  | ({
    l2Chain: TL2Chain
  } & { [k in `${TContract}Address`]?: never })
  | ({
    l2Chain?: never
  } & { [k in `${TContract}Address`]: Address })

  
export type WriteActionBaseType<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TContract extends OpStackL1Contract = OpStackL1Contract,
  TFunctioName extends string = string,
  _resolvedChain = ResolveChain<TChain, TChainOverride>,
  _l2 extends
    | (_resolvedChain extends Chain ? OpStackChain & { opStackConfig: { l1: { chainId: _resolvedChain['id'] } } }
      : never)
    | never = never,
> = GetChain<TChain, TChainOverride>
  & ActionBaseType<_l2, TContract>
  & Omit<
    WriteContractParameters<
      TAbi,
      TFunctioName,
      TChain,
      TAccount,
      TChainOverride
    >,
    'abi' | 'functionName' | 'args' | 'address' | 'chain'
  >
  type GetChain<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = IsUndefined<TChain> extends true
  ? { chain: TChainOverride | null }
  : { chain?: TChainOverride | null };

export type SimulateActionBaseType<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TContract extends OpStackL1Contract = OpStackL1Contract,
  TFunctioName extends string = string,
  _resolvedChain = ResolveChain<TChain, TChainOverride>,
  _l2 extends
    | (_resolvedChain extends Chain ? OpStackChain & { opStackConfig: { l1: { chainId: _resolvedChain['id'] } } }
      : never)
    | never = never,
> =
  & ActionBaseType<_l2, TContract>
  & Omit<
    SimulateContractParameters<TAbi, TFunctioName, TChain, TChainOverride>,
    'abi' | 'functionName' | 'args' | 'address'
  >
