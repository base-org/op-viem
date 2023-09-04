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
import { ChainContract } from 'viem'
import { writeContract } from 'viem/actions'
import { ResolveChain, WriteActionBaseType } from '../../../types/actions'
import { OpStackL1Contracts } from '../../../types/opStackContracts'

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
  _contractName extends OpStackL1Contracts = OpStackL1Contracts.optimismPortal,
  _functionName extends string = 'depositTransaction',
  _resolvedChain extends Chain | undefined = ResolveChain<
    TChain,
    TChainOverride
  >,
> =
  & {
    args: DepositTransactionParameters
  }
  & WriteActionBaseType<
    TChain,
    TAccount,
    typeof optimismPortalABI,
    TChainOverride,
    _contractName,
    _functionName,
    _resolvedChain
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
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, value, gasLimit, isCreation, data },
    l2ChainId,
    optimismPortalAddress,
    chain = client.chain,
    ...rest
  }: WriteUnsafeDepositTransactionParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  const resolved: ChainContract | undefined = l2ChainId
    ? chain?.contracts?.[OpStackL1Contracts.optimismPortal]?.[l2ChainId]
    : undefined
  const portal = optimismPortalAddress || resolved?.address
  if (!portal) {
    throw new Error('No address for optimismPortal')
  }
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
