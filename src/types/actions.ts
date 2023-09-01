import { Address, Chain } from 'viem'
import { OpStackL1Contracts } from './opStackContracts'

export type ExtractValidChainIdFromContract<
  TChain extends Chain | undefined,
  contractName extends OpStackL1Contracts,
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
