import type { Abi, Account, Address, Chain, SimulateContractParameters, WriteContractParameters } from 'viem'
import type { OpStackChain } from './opStackChain.js'
import type { OpStackL1Contract } from './opStackContracts.js'

export type ResolveChain<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = TChainOverride extends Chain ? TChainOverride : TChain

export type GetL2Chain<TChain extends Chain | undefined> = TChain extends Chain
  ? OpStackChain & { opStackConfig: { l1: { chainId: TChain['id'] } } }
  : never

export type L1ActionBaseType<
  TL2Chain extends OpStackChain,
  TContract extends OpStackL1Contract,
> =
  | ({
    l2Chain: TL2Chain
  } & { [k in `${TContract}Address`]?: never })
  | ({
    l2Chain?: never
  } & { [k in `${TContract}Address`]: Address })

export type L1WriteActionBaseType<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctioName extends string = string,
> = Omit<
  WriteContractParameters<
    TAbi,
    TFunctioName,
    TChain,
    TAccount,
    TChainOverride
  >,
  'abi' | 'functionName' | 'args' | 'address' | 'chain'
>

export type L1SimulateActionBaseType<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctioName extends string = string,
  _resolvedChain = ResolveChain<TChain, TChainOverride>,
  _l2 extends
    | (_resolvedChain extends Chain ? OpStackChain & { opStackConfig: { l1: { chainId: _resolvedChain['id'] } } }
      : never)
    | never = never,
> = Omit<
  SimulateContractParameters<TAbi, TFunctioName, TChain, TChainOverride>,
  'abi' | 'functionName' | 'args' | 'address'
>
