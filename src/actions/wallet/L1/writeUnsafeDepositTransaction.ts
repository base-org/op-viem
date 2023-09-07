import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { Account, Address, Chain, Hex, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { ActionBaseType, ResolveChain, WriteActionBaseType } from '../../../types/actions'
import { OpStackChain } from '../../../types/opStackChain'
import { OpStackL1Contract } from '../../../types/opStackContracts'
import { writeOpStackL1, WriteOpStackL1Parameters } from './writeOpStackL1'

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
}

export type WriteUnsafeDepositTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TResolvedChain = ResolveChain<TChain, TChainOverride>,
  TL2Chain extends
    | (TResolvedChain extends Chain ? OpStackChain & { opStackConfig: { l1: { chainId: TResolvedChain['id'] } } }
      : never)
    | never = never,
> =
  & { args: DepositTransactionParameters }
  & WriteActionBaseType<TChain, TAccount, TChainOverride, typeof optimismPortalABI, OpStackL1Contract.OptimismPortal, 'depositTransaction', TResolvedChain, TL2Chain>

/**
 * Calls depositTransaction directly on the OptimismPortal contract.
 * Marked 'unsafe' becaused does not offer replayability incase the
 * L2 tx fails.
 *
 * @param parameters - {@link WriteUnsafeDepositTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeUnsafeDepositTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
  TResolvedChain = ResolveChain<TChain, TChainOverride>,
  TL2Chain extends
    | (TResolvedChain extends Chain ? OpStackChain & { opStackConfig: { l1: { chainId: TResolvedChain['id'] } } }
      : never)
    | never = never,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, value, gasLimit, isCreation, data },
    optimismPortalAddress,
    ...rest
  }:
    & { args: DepositTransactionParameters }
    & WriteActionBaseType<
      TChain,
      TAccount,
      TChainOverride,
      typeof optimismPortalABI,
      OpStackL1Contract.OptimismPortal,
      'depositTransaction',
      TResolvedChain,
      TL2Chain
    >,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: optimismPortalAddress,
    abi: optimismPortalABI,
    contract: OpStackL1Contract.OptimismPortal,
    functionName: 'depositTransaction',
    args: [to, value || 0n, gasLimit, isCreation || false, data || '0x'],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TChain,
    TAccount,
    TChainOverride,
    typeof optimismPortalABI,
    'depositTransaction'
  >)
}
