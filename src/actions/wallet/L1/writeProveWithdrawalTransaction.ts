import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import type { GetProveWithdrawalTransactionArgsReturnType } from '../../index.js'
import { writeOpStackL1, type WriteOpStackL1Parameters } from './writeOpStackL1.js'

const ABI = optimismPortalABI
const CONTRACT = OpStackL1Contract.OptimismPortal
const FUNCTION = 'proveWithdrawalTransaction'

export type ProveWithdrawalTransactionArgs = GetProveWithdrawalTransactionArgsReturnType

export type WriteProveWithdrawalTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: ProveWithdrawalTransactionArgs }
  & L1WriteActionBaseType<
    TChain,
    TAccount,
    TChainOverride,
    typeof ABI,
    typeof CONTRACT,
    typeof FUNCTION
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
    optimismPortalAddress,
    ...rest
  }: WriteProveWithdrawalTransactionParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: optimismPortalAddress,
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [withdrawalTransaction, L2OutputIndex, outputRootProof, withdrawalProof],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TChain,
    TAccount,
    TChainOverride,
    typeof ABI,
    typeof FUNCTION
  >)
}
