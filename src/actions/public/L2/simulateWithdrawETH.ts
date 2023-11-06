import type {
  Account,
  Address,
  Chain,
  ContractFunctionArgs,
  PublicClient,
  SimulateContractReturnType,
  Transport,
} from 'viem'
import type { L2SimulateContractParameters } from '../../../types/l2Actions.js'
import { type ABI, type FUNCTION, OVM_ETH, type WithdrawETHParameters } from '../../../types/withdrawTo.js'
import {
  simulateWithdrawERC20,
  type SimulateWithdrawERC20Parameters,
  type SimulateWithdrawERC20ReturnType,
} from './simulateWithdrawERC20.js'

export type SimulateWithdrawETHParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAccountOverride extends Account | Address | undefined = undefined,
> =
  & { args: WithdrawETHParameters }
  & L2SimulateContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
    TChain,
    TChainOverride,
    TAccountOverride
  >

export type SimulateWithdrawETHReturnType<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TAccountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateWithdrawERC20ReturnType<TChain, TAccount, TChainOverride, TAccountOverride>

/**
 * Simulates a withdrawal of ETH to an L1 address.
 *
 * @param {Address} to the address to withdraw to on L1
 * @param {Bigint} amount the amount of ETH to withdraw
 * @param {Bigint} minGasLimit the minimum gas limit for the withdrawal
 * @param {Hex} [extraData] the extra data for the withdrawal
 */
export async function simulateWithdrawETH<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
  TAccountOverride extends Account | Address | undefined = undefined,
>(client: PublicClient<Transport, TChain>, {
  args: { to, amount, minGasLimit, extraData = '0x' },
  ...rest
}: SimulateWithdrawETHParameters<
  TChain,
  TChainOverride,
  TAccountOverride
>): Promise<SimulateWithdrawETHReturnType<TChain, TAccount, TChainOverride, TAccountOverride>> {
  return simulateWithdrawERC20(client, {
    args: { l2Token: OVM_ETH, to, amount, minGasLimit, extraData },
    // NOTE: msg.value must = amount or transaction will revert
    // https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/universal/StandardBridge.sol#L306
    value: amount,
    ...rest,
  } as unknown as SimulateWithdrawERC20Parameters<
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
