import { Chain } from 'viem'
import { Abi, Account, Address, Transport, WalletClient, WriteContractParameters, WriteContractReturnType } from 'viem'
import { writeContract } from 'viem/actions'
import { GetL1ChainId } from '../../../types/actions'
import { OpStackChain, OpStackL1Contract } from '../../../types/opStackContracts'

export type WriteOpStackL1Parameters<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> =
  & { contract: OpStackL1Contract; chain: TChain | TChainOverride }
  & ({
    l2Chain: TL2Chain
    address?: never
  } | {
    l2Chain?: never
    address: Address
  })
  & Omit<
    WriteContractParameters<
      TAbi,
      TFunctionName,
      TChain,
      TAccount,
      TChainOverride
    >,
    'address' | 'chain'
  >

export function writeOpStackL1<
  TL2Chain extends OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain>,
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
  }: WriteOpStackL1Parameters<TL2Chain, TChain, TAccount, TChainOverride, TAbi, TFunctionName>,
): Promise<WriteContractReturnType> {
  if (l2Chain && l2Chain.optimismConfig.l1.chainId !== chain?.id) {
    throw new Error('Chain does not match known L1 for l2Chain')
  }
  if (!l2Chain && !address) {
    throw new Error(`Must provide either l2Chain or ${contract}Address`)
  }
  const resolvedAddress = address ?? l2Chain.optimismConfig.l1.contracts[contract].address
  return writeContract(client, {
    address: resolvedAddress,
    chain: chain,
    ...rest,
  } as unknown as WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >)
}
