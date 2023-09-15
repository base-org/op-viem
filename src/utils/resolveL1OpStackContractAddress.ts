import type { Address, Chain } from 'viem'
import { L1ChainMismatchError, L2ChainOrAddressError } from '../errors/action.js'
import type { GetL2Chain } from '../types/l1Actions.js'
import type { OpStackL1Contract } from '../types/opStackContracts.js'

export type ResolveL1OpStackContractAddressParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { contract: OpStackL1Contract; chain: TChain | TChainOverride }
  & ({
    l2Chain: GetL2Chain<TChain>
    address?: never
  } | {
    l2Chain?: never
    address: Address
  })

export function resolveL1OpStackContractAddress<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  { l2Chain, chain, contract, address }: ResolveL1OpStackContractAddressParameters<TChain, TChainOverride>,
) {
  if (l2Chain && l2Chain.opStackConfig.l1.chainId !== chain?.id) {
    throw new L1ChainMismatchError({ chainId: chain?.id, opChainL1ChainId: l2Chain.opStackConfig.l1.chainId })
  }
  if (!address && (!l2Chain || !l2Chain.opStackConfig.l1.contracts[contract])) {
    throw new L2ChainOrAddressError({ contract })
  }
  return address ?? l2Chain.opStackConfig.l1.contracts[contract].address
}
