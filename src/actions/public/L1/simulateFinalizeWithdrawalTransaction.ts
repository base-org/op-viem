import type {
  Account,
  Address,
  Chain,
  ContractFunctionArgs,
  PublicClient,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from 'viem'
import { simulateContract } from 'viem/actions'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { type L1SimulateActionBaseType } from '../../../types/l1Actions.js'
import {
  ABI,
  type FinalizeWithdrawalTransactionParameters,
  FUNCTION,
} from '../../wallet/L1/writeFinalizeWithdrawalTransaction.js'

export type SimulateFinalizeWithdrawalTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAccountOverride extends Account | Address | undefined = undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { withdrawal: FinalizeWithdrawalTransactionParameters; portal: RawOrContractAddress<_chainId> }
  & L1SimulateActionBaseType<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
    TChain,
    TChainOverride,
    TAccountOverride
  >

export type SimulateFinalizeWithdrawalTransactionReturnType<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAccountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof ABI,
  typeof FUNCTION,
  ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
  TChain,
  TAccount,
  TChainOverride,
  TAccountOverride
>

/**
 * Simulates a call to finalizeWithdrawalTranasction on the OptimismPortal contract.
 *
 * @param parameters - {@link SimulateFinalizeWithdrawalTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateFinalizeWithdrawalTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
  TAccountOverride extends Account | Address | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    withdrawal,
    portal,
    ...rest
  }: SimulateFinalizeWithdrawalTransactionParameters<
    TChain,
    TChainOverride,
    TAccountOverride
  >,
): Promise<SimulateFinalizeWithdrawalTransactionReturnType<TChain, TAccount, TChainOverride, TAccountOverride>> {
  return simulateContract(client, {
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [withdrawal],
    ...rest,
  } as unknown as SimulateContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
    TChain,
    TChainOverride,
    TAccountOverride
  >) as unknown as SimulateContractReturnType<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
    TChain,
    TAccount,
    TChainOverride,
    TAccountOverride
  >
}
