import { Abi, Account, Address, Chain, SimulateContractParameters, WriteContractParameters } from 'viem'
import { OpStackChain, OpStackL1Contract } from './opStackContracts'

export type GetL1ChainId<TOpStackChain extends OpStackChain> = {
  id: TOpStackChain['optimismConfig']['l1']['chainId']
}

export type ExtractValidChainIdFromContract<
  TChain extends Chain | undefined,
  contractName extends string,
> = TChain extends Chain
  ? TChain['contracts'] extends { [key: string]: any }
    ? TChain['contracts'][contractName] extends { [chainId: number]: Address } ? keyof TChain['contracts'][contractName]
    : undefined
  : undefined
  : undefined

export type ResolveChain<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = TChainOverride extends Chain ? TChainOverride : TChain

export type GetL2ChainId<
  TChain extends Chain | undefined,
  contractName extends string,
> = ExtractValidChainIdFromContract<TChain, contractName> extends undefined ? {
    l2ChainId?: `Contract ${contractName} is not provided on chain. Please add a ${contractName}Address as an arugment`
  }
  // NOTE(Wilson): users will see this as a required arg in the case they are passing optimismPortalAddress
  // explicitly and the chain has entries at contracts[contractName], e.g. I am using a chain with some
  // known optimismPortal address but I am sending to a different one. toChainId does not actually get
  // get used in the code on this path, but I am leaving this as making it optional means NOT passing optimismPortalAddress
  // and also not passing toChainId is allowed.
  : { l2ChainId: ExtractValidChainIdFromContract<TChain, contractName> }

// actually isn't quite what we want? do we want to let them override
// contract name might be specified but this specific chain might not be
// we want to say, if they pass in a toChainId then we need to make sure

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
    'abi' | 'functionName' | 'args' | 'address' | 'value'
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
