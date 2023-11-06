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
  FUNCTION,
  type ProveWithdrawalTransactionParameters,
} from '../../wallet/L1/writeProveWithdrawalTransaction.js'

export type SimulateProveWithdrawalTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAccountOverride extends Account | Address | undefined = undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: ProveWithdrawalTransactionParameters; portal: RawOrContractAddress<_chainId> }
  & L1SimulateActionBaseType<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
    TChain,
    TChainOverride,
    TAccountOverride
  >

export type SimulateProveWithdrawalTransactionReturnType<
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
 * Simulates a call to proveWithdrawalTransaction on the OptimismPortal contract.
 * Is the first L1 step of a withdrawal.
 *
 * @param parameters - {@link SimulateProveWithdrawalTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateProveWithdrawalTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
  TAccountOverride extends Account | Address | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { withdrawalTransaction, outputRootProof, withdrawalProof, L2OutputIndex },
    portal,
    ...rest
  }: SimulateProveWithdrawalTransactionParameters<
    TChain,
    TChainOverride,
    TAccountOverride
  >,
): Promise<SimulateProveWithdrawalTransactionReturnType<TChain, TAccount, TChainOverride, TAccountOverride>> {
  return simulateContract(client, {
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [withdrawalTransaction, L2OutputIndex, outputRootProof, withdrawalProof],
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
