import { Chain } from 'viem'
import { Abi, Account, Address, Transport, WalletClient, WriteContractParameters, WriteContractReturnType } from 'viem'
import { writeContract } from 'viem/actions'
import { L1ChainMismatchError, L2ChainOrAddressError } from '../../../../errors/action'
import { ResolveChain } from '../../../types/actions'
import { OpStackChain } from '../../../types/opStackChain'
import { OpStackL1Contract } from '../../../types/opStackContracts'

export type WriteOpStackL1Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctioName extends string = string,
  _resolvedChain = ResolveChain<TChain, TChainOverride>,
  _l2 extends
    | (_resolvedChain extends Chain ? OpStackChain & { opStackConfig: { l1: { chainId: _resolvedChain['id'] } } }
      : never)
    | never = never,
> =
  & { contract: OpStackL1Contract; chain: TChain | TChainOverride }
  & ({
    l2Chain: _l2
    address?: never
  } | {
    l2Chain?: never
    address: Address
  })
  & Omit<
    WriteContractParameters<
      TAbi,
      TFunctioName,
      TChain,
      TAccount,
      TChainOverride
    >,
    'address' | 'chain'
  >

export function writeOpStackL1<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
  const TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    l2Chain,
    contract,
    address,
    chain = client.chain,
    ...rest
  }: WriteOpStackL1Parameters<TChain, TAccount, TChainOverride, TAbi, TFunctionName>,
): Promise<WriteContractReturnType> {
  if (l2Chain && l2Chain.opStackConfig.l1.chainId !== chain?.id) {
    throw new L1ChainMismatchError({ chainId: chain?.id, opChainL1ChainId: l2Chain.opStackConfig.l1.chainId })
  }
  if (!address && (!l2Chain || !l2Chain.opStackConfig.l1.contracts[contract])) {
    throw new L2ChainOrAddressError({ contract })
  }
  const resolvedAddress = address ?? l2Chain.opStackConfig.l1.contracts[contract].address
  return writeContract(client, {
    address: resolvedAddress,
    ...rest,
  } as unknown as WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >)
}
