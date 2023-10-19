import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Account, Chain, Transport, WalletClient, WriteContractParameters, WriteContractReturnType } from 'viem'
import { writeContract } from 'viem/actions'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import type { GetProveWithdrawalTransactionArgsReturnType } from '../../index.js'

export const ABI = optimismPortalABI
export const CONTRACT = OpStackL1Contract.OptimismPortal
export const FUNCTION = 'proveWithdrawalTransaction'

export type ProveWithdrawalTransactionParameters = GetProveWithdrawalTransactionArgsReturnType

export type WriteProveWithdrawalTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: ProveWithdrawalTransactionParameters; portal: RawOrContractAddress<_chainId> }
  & L1WriteActionBaseType<
    TChain,
    TAccount,
    TChainOverride
  >

/**
 * Calls proveWithdrawalTransaction on the OptimismPortal contract.
 * Is the first L1 step of a withdrawal.
 *
 * @param parameters - {@link WriteProveWithdrawalTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeProveWithdrawalTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { withdrawalTransaction, outputRootProof, withdrawalProof, L2OutputIndex },
    portal,
    ...rest
  }: WriteProveWithdrawalTransactionParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: resolveAddress(portal),
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [withdrawalTransaction, L2OutputIndex, outputRootProof, withdrawalProof],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    TChain,
    TAccount,
    TChainOverride
  >)
}
