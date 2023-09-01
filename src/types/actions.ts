import { Address, Chain } from 'viem'

export type ExtractValidChainIdFromContract<
  TChain extends Chain | undefined,
  contractName extends string,
> = TChain extends Chain
  ? TChain['contracts'] extends { [key: string]: any }
    ? TChain['contracts'][contractName] extends { [chainId: number]: Address }
      ? keyof TChain['contracts'][contractName]
      : undefined
    : undefined
  : undefined

export type ResolveChain<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = TChainOverride extends Chain ? TChainOverride : TChain

export type GetTo<
  TChain extends Chain | undefined,
  contractName extends string,
> = ExtractValidChainIdFromContract<TChain, contractName> extends undefined
  ? {
      toChainId?: `Contract ${contractName} is not provided on chain. Please add a ${contractName}Address as an arugment`
    }
  : // NOTE(Wilson): users will see this as a required arg in the case they are passing optimismPortalAddress
    // explicitly and the chain has entries at contracts[contractName], e.g. I am using a chain with some
    // known optimismPortal address but I am sending to a different one. toChainId does not actually get
    // get used in the code on this path, but I am leaving this as making it optional means NOT passing optimismPortalAddress
    // and also not passing toChainId is allowed.
    { toChainId: ExtractValidChainIdFromContract<TChain, contractName> }

// actually isn't quite what we want? do we want to let them override
// contract name might be specified but this specific chain might not be
// we want to say, if they pass in a toChainId then we need to make sure

export type GetContractAddress<
  TChain extends Chain | undefined,
  contractName extends string,
> = TChain extends Chain
  ? TChain['contracts'] extends { [key: string]: any }
    ? TChain['contracts'][contractName] extends { [chainId: number]: Address }
      ? {
          [k in `${contractName}Address`]?: Address
        }
      : {
          [k in `${contractName}Address`]: Address
        }
    : never
  : never
