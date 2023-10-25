import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type {
  Account,
  Chain,
  ContractFunctionArgs,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'
import type { _ } from 'vitest/dist/reporters-cb94c88b.js'
import type { MessagePassedEvent } from '../../../index.js'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'

export const ABI = optimismPortalABI
export const FUNCTION = 'finalizeWithdrawalTransaction'

export type FinalizeWithdrawalTransactionParameters = Omit<MessagePassedEvent, 'withdrawalHash'>

export type WriteFinalizeWithdrawalTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: { withdrawal: FinalizeWithdrawalTransactionParameters }; portal: RawOrContractAddress<_chainId> }
  & L1WriteActionBaseType<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
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
    args: { withdrawal },
    portal,
    ...rest
  }: WriteFinalizeWithdrawalTransactionParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [withdrawal],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<
      typeof ABI,
      'nonpayable',
      typeof FUNCTION
    >,
    TChain,
    TAccount,
    TChainOverride
  >)
}
