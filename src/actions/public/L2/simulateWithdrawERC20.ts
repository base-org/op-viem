import type { Chain, PublicClient, SimulateContractParameters, SimulateContractReturnType, Transport } from 'viem'
import { simulateContract } from 'viem/actions'
import type { L2SimulateContractParameters } from '../../../types/l2Actions.js'
import { opStackL2ChainContracts } from '../../../types/opStackContracts.js'
import { ABI, FUNCTION, type WithdrawToParameters } from '../../../types/withdrawTo.js'

export type SimulateWithdrawERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: WithdrawToParameters }
  & L2SimulateContractParameters<typeof ABI, typeof FUNCTION, TChain, TChainOverride>

export type SimulateWithdrawERC20ReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<typeof ABI, typeof FUNCTION, TChain, TChainOverride>

export async function simulateWithdrawERC20<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(client: PublicClient<Transport, TChain>, {
  args: { l2Token, to, amount, minGasLimit, extraData = '0x' },
  ...rest
}: SimulateWithdrawERC20Parameters<
  TChain,
  TChainOverride
>): Promise<SimulateWithdrawERC20ReturnType<TChain, TChainOverride>> {
  return simulateContract(client, {
    abi: ABI,
    functionName: FUNCTION,
    args: [l2Token, to, amount, minGasLimit, extraData],
    address: opStackL2ChainContracts.l2StandardBridge.address,
    ...rest,
  } as unknown as SimulateContractParameters<
    typeof ABI,
    typeof FUNCTION,
    TChain,
    TChainOverride
  >)
}
