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
import { ABI, type DepositTransactionParameters, FUNCTION } from '../../wallet/L1/writeDepositTransaction.js'

export type SimulateDepositTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAccountOverride extends Account | Address | undefined = undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: DepositTransactionParameters; portal: RawOrContractAddress<_chainId> }
  & L1SimulateActionBaseType<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
    TChain,
    TChainOverride,
    TAccountOverride
  >

export type SimulateDepositTransactionReturnType<
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
  ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
  TChain,
  TAccount,
  TChainOverride,
  TAccountOverride
>

/**
 * Simulates a call to DepositTranasction on the OptimismPortal contract.
 *
 * @param parameters - {@link SimulateDepositTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateDepositTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
  TAccountOverride extends Account | Address | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { to, value = 0n, gasLimit, isCreation = false, data = '0x' },
    portal,
    ...rest
  }: SimulateDepositTransactionParameters<
    TChain,
    TChainOverride,
    TAccountOverride
  >,
): Promise<SimulateDepositTransactionReturnType<TChain, TAccount, TChainOverride, TAccountOverride>> {
  return simulateContract(client, {
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [to, value, gasLimit, isCreation, data],
    ...rest,
  } as unknown as SimulateContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
    TChain,
    TChainOverride,
    TAccountOverride
  >) as unknown as SimulateContractReturnType<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
    TChain,
    TAccount,
    TChainOverride,
    TAccountOverride
  >
}
