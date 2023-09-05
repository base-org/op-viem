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
import { writeContract } from 'viem/actions'
import { ResolvedL1ChainId } from '../../../types/actions'
import { OpStackChain } from '../../../types/opStackContracts'

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
}

export type WriteUnsafeDepositTransactionParameters<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & ResolvedL1ChainId<TL2Chain> = Chain & ResolvedL1ChainId<TL2Chain>,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _abi extends typeof optimismPortalABI = typeof optimismPortalABI,
  _functionName extends string = 'depositTransaction',
> =
  & { args: DepositTransactionParameters }
  & ({
    l2Chain: TL2Chain
    optimismPortalAddress?: never
  } | {
    l2Chain?: never
    optimismPortalAddress: Address
  })
  & Omit<
    WriteContractParameters<
      _abi,
      _functionName,
      TChain,
      TAccount,
      TChainOverride
    >,
    'abi' | 'functionName' | 'args' | 'address' | 'chain'
  >

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
  TChain extends Chain & ResolvedL1ChainId<TL2Chain>,
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
  const portal = optimismPortalAddress ?? l2Chain.optimismConfig.l1.contracts.optimismPortal.address
  return writeContract(client, {
    address: portal,
    abi: optimismPortalABI,
    functionName: 'depositTransaction' as any,
    args: [to, value || 0n, gasLimit, isCreation || false, data || '0x'],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof optimismPortalABI,
    'depositTransaction',
    TChain,
    TAccount,
    TChainOverride
  >)
}
