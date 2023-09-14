import type { Chain, PublicClient, Transport } from 'viem'
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
> =
  & { args: WithdrawETHParameters }
  & L2SimulateContractParameters<typeof ABI, typeof FUNCTION, TChain, TChainOverride>

export type SimulateWithdrawETHReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateWithdrawERC20ReturnType<TChain, TChainOverride>

export async function simulateWithdrawETH<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(client: PublicClient<Transport, TChain>, {
  args: { to, amount, minGasLimit, extraData = '0x' },
  ...rest
}: SimulateWithdrawETHParameters<
  TChain,
  TChainOverride
>): Promise<SimulateWithdrawETHReturnType<TChain, TChainOverride>> {
  return simulateWithdrawERC20(client, {
    args: { l2Token: OVM_ETH, to, amount, minGasLimit, extraData },
    // NOTE: msg.value must = amount or transaction will revert
    // https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/universal/StandardBridge.sol#L306
    value: amount,
    ...rest,
  } as unknown as SimulateWithdrawERC20Parameters<TChain, TChainOverride>)
}
