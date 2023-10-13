import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import type { _ } from 'vitest/dist/reporters-cb94c88b.js'
import type { MessagePassedEvent } from '../../../index.js'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import { writeOpStackL1, type WriteOpStackL1Parameters } from './writeOpStackL1.js'

export const ABI = optimismPortalABI
export const CONTRACT = OpStackL1Contract.OptimismPortal
export const FUNCTION = 'finalizeWithdrawalTransaction'

export type FinalizeWithdrawalTransactionParameters = Omit<MessagePassedEvent, 'withdrawalHash'>

export type WriteFinalizeWithdrawalTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { withdrawal: FinalizeWithdrawalTransactionParameters; portal: RawOrContractAddress<_chainId> }
  & L1WriteActionBaseType<
    TChain,
    TAccount,
    TChainOverride
  >

/**
 * Calls writeFinalizeWithdrawalTranasction on the OptimismPortal contract.
 * Is the second and final L1 step of a withdrawal.
 *
 * @param parameters - {@link WriteFinalizeWithdrawalTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeFinalizeWithdrawalTranasction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    withdrawal,
    portal,
    ...rest
  }: WriteFinalizeWithdrawalTransactionParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: resolveAddress(portal),
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [withdrawal],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TChain,
    TAccount,
    TChainOverride,
    typeof ABI,
    typeof FUNCTION
  >)
}
