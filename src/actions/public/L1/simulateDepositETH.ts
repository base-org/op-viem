import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Chain, PublicClient, SimulateContractReturnType, Transport } from 'viem'
import { SimulateActionBaseType } from '../../../types/actions'
import { DepositETHParameters } from '../../../types/depositETHParameters'
import { OpStackL1Contract } from '../../../types/opStackContracts'
import { simulateOpStackL1, SimulateOpStackL1Parameters } from './simulateOpStackL1'

const ABI = l1StandardBridgeABI
const CONTRACT = OpStackL1Contract.OptimismL1StandardBridge
const FUNCTION = 'depositETH'

export type SimulateDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: DepositETHParameters }
  & SimulateActionBaseType<TChain, TChainOverride, typeof ABI, typeof CONTRACT, typeof FUNCTION>

export type SimulateDepositETHReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<typeof ABI, typeof FUNCTION, TChain, TChainOverride>

/**
 * Simulates a deposit of ETH to L2
 * @param parameters - {@link SimulateDepositETHParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function simulateDepositETH<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { minGasLimit, extraData = '0x' },
    optimismL1StandardBridgeAddress,
    ...rest
  }: SimulateDepositETHParameters<TChain, TChainOverride>,
): Promise<SimulateDepositETHReturnType<TChain, TChainOverride>> {
  return simulateOpStackL1(client, {
    address: optimismL1StandardBridgeAddress,
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [minGasLimit, extraData],
    ...rest,
  } as unknown as SimulateOpStackL1Parameters<TChain, TChainOverride, typeof ABI, typeof FUNCTION>)
}
