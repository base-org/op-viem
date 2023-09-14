import type { Chain, PublicClient, SimulateContractReturnType, Transport } from 'viem'
import { ABI, CONTRACT, type DepositERC20Parameters, FUNCTION } from '../../../types/depositERC20.js'
import type { L1SimulateActionBaseType } from '../../../types/l1Actions.js'
import { simulateOpStackL1, type SimulateOpStackL1Parameters } from './simulateOpStackL1.js'

export type SimulateDepositERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: DepositERC20Parameters }
  & L1SimulateActionBaseType<TChain, TChainOverride, typeof ABI, typeof CONTRACT, typeof FUNCTION>

export type SimulateDepositERC20ReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<typeof ABI, typeof FUNCTION, TChain, TChainOverride>

/**
 * Simulates a deposit of ERC20 tokens to L2
 * @param parameters - {@link SimulateDepositERC20Parameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateDepositERC20<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { l1Token, l2Token, to, amount, minGasLimit, extraData = '0x' },
    l1StandardBridgeAddress,
    ...rest
  }: SimulateDepositERC20Parameters<TChain, TChainOverride>,
): Promise<SimulateContractReturnType<typeof ABI, typeof FUNCTION, TChain, TChainOverride>> {
  return simulateOpStackL1(client, {
    address: l1StandardBridgeAddress,
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [l1Token, l2Token, to, amount, minGasLimit, extraData],
    ...rest,
  } as unknown as SimulateOpStackL1Parameters<TChain, TChainOverride, typeof ABI, typeof FUNCTION>)
}
