import { Abi, Account, Address, Chain, SimulateContractParameters, WriteContractParameters } from 'viem'
import { OpStackChain } from './opStackChain'
import { OpStackL1Contract } from './opStackContracts'

export type GetL1ChainId<TOpStackChain extends OpStackChain> = {
  id: TOpStackChain['opStackConfig']['l1']['chainId']
}

export type GetContractAddress<
  TChain extends Chain | undefined,
  contractName extends string,
> = TChain extends Chain
  ? TChain['contracts'] extends { [key: string]: any }
    ? TChain['contracts'][contractName] extends { [chainId: number]: Address } ? {
        [k in `${contractName}Address`]?: Address
      }
    : {
      [k in `${contractName}Address`]: Address
    }
  : never
  : never

export type ActionBaseType<
  TL2Chain extends OpStackChain = OpStackChain,
  TContract extends OpStackL1Contract = OpStackL1Contract,
> =
  | ({
    l2Chain: TL2Chain
  } & { [k in `${TContract}Address`]?: never })
  | ({
    l2Chain?: never
  } & { [k in `${TContract}Address`]: Address })

export type WriteActionBaseType<
  TL2Chain extends OpStackChain = OpStackChain,
  // TODO(Wilson): this type check is not working, only check that id is type number
  // not that it matches exactly
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined = Chain & GetL1ChainId<TL2Chain> | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TContract extends OpStackL1Contract = OpStackL1Contract,
  TFunctionname extends string = string,
> =
  & ActionBaseType<TL2Chain, TContract>
  & Omit<
    WriteContractParameters<
      TAbi,
      TFunctionname,
      TChain,
      TAccount,
      TChainOverride
    >,
    // TODO(Wilson): There were some issues with `value` so
    // we omit and specify explicitly in the function args
    // but it would be nice to get all the types working better with viem
    'abi' | 'functionName' | 'args' | 'address'
  >

export type SimulateActionBaseType<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined = Chain & GetL1ChainId<TL2Chain> | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  _contractName extends OpStackL1Contract = OpStackL1Contract,
  _functionName extends string = string,
> =
  & ActionBaseType<TL2Chain, _contractName>
  & Omit<
    SimulateContractParameters<TAbi, _functionName, TChain, TChainOverride>,
    'abi' | 'functionName' | 'args' | 'address'
  >
