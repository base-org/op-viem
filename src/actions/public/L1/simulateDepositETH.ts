import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Chain, PublicClient, SimulateContractParameters, SimulateContractReturnType, Transport } from 'viem'
import { GetL1ChainId, SimulateActionBaseType } from '../../../types/actions'
import { DepositETHParameters } from '../../../types/depositETHParameters'
import { OpStackChain } from '../../../types/opStackChain'
import { OpStackL1Contract } from '../../../types/opStackContracts'
import { simulateOpStackL1, SimulateOpStackL1Parameters } from './simulateOpStackL1'

export type SimulateDepositETHParameters<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined = Chain & GetL1ChainId<TL2Chain> | undefined,
  _abi extends typeof l1StandardBridgeABI = typeof l1StandardBridgeABI,
  _contractName extends OpStackL1Contract = OpStackL1Contract.OptimismL1StandardBridge,
  _functionName extends string = 'depositETH',
> =
  & { args: DepositETHParameters }
  & SimulateActionBaseType<TL2Chain, TChain, TChainOverride, _abi, _contractName, _functionName>

/**
 * Simulates a deposit of ETH to L2
 * @param {SimulateDepositETHParameters} args {@link SimulateDepositETHParameters}
 * @param {OpChainL2} toChain the L2 chain to deposit to
 * @returns {SimulateDepositETHReturnType} the simulated transaction
 */
export async function simulateDepositETH<
  TL2Chain extends OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain>,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined,
  _abi extends typeof l1StandardBridgeABI = typeof l1StandardBridgeABI,
  _functionName extends string = 'depositETH',
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { minGasLimit, extraData = '0x' },
    optimismL1StandardBridgeAddress,
    ...rest
  }: SimulateDepositETHParameters<TL2Chain, TChain, TChainOverride>,
): Promise<SimulateContractReturnType<_abi, _functionName, TChain, TChainOverride>> {
  return simulateOpStackL1(client, {
    address: optimismL1StandardBridgeAddress,
    abi: l1StandardBridgeABI,
    contract: OpStackL1Contract.OptimismL1StandardBridge,
    functionName: 'depositETH',
    args: [minGasLimit, extraData],
    ...rest,
  } as unknown as SimulateOpStackL1Parameters<TL2Chain, TChain, TChainOverride, _abi, _functionName>)
}
