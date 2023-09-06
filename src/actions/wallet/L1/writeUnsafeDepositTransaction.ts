import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import {
  Account,
  Address,
  Chain,
  Hex,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { Abi } from 'viem'
import { writeContract } from 'viem/actions'
import { GetL1ChainId, WriteActionBaseType } from '../../../types/actions'
import { OpStackChain, OpStackL1Contract } from '../../../types/opStackContracts'

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
}

export type WriteUnsafeDepositTransactionParameters<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined = Chain & GetL1ChainId<TL2Chain> | undefined,
  _abi extends typeof optimismPortalABI = typeof optimismPortalABI,
  _functionName extends string = 'depositTransaction',
  _contractName extends OpStackL1Contract = 'optimismPortal',
> =
  & { args: DepositTransactionParameters; value?: bigint }
  & WriteActionBaseType<TL2Chain, TChain, TAccount, TChainOverride, _abi, _contractName>

/**
 * Calls depositTransaction directly on the OptimismPortal contract.
 * Marked 'unsafe' becaused does not offer replayability incase the
 * L2 tx fails.
 *
 * @param parameters - {@link WriteUnsafeDepositTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeUnsafeDepositTransaction<
  TL2Chain extends OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, value, gasLimit, isCreation, data },
    l2Chain,
    optimismPortalAddress,
    ...rest
  }: WriteUnsafeDepositTransactionParameters<TL2Chain, TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return opStackL1WriteContract(client, {
    address: optimismPortalAddress,
    l2Chain,
    abi: optimismPortalABI,
    functionName: 'depositTransaction',
    contract: 'optimismPortal',
    args: [to, value || 0n, gasLimit, isCreation || false, data || '0x'],
    ...rest,
  } as unknown as OpStackL1WriteContractParameters<
    TL2Chain,
    TChain,
    TAccount,
    TChainOverride,
    typeof optimismPortalABI,
    'depositTransaction'
  >)
}

export type OpStackL1WriteContractParameters<
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

export function opStackL1WriteContract<
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
  }: OpStackL1WriteContractParameters<TL2Chain, TChain, TAccount, TChainOverride, TAbi, TFunctionName>,
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
