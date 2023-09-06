import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Chain, PublicClient, SimulateContractReturnType, Transport } from 'viem'
import { GetL1ChainId, SimulateActionBaseType } from '../../../types/actions'
import { DepositERC20Parameters } from '../../../types/depositERC20Parameters'
import { OpStackChain } from '../../../types/opStackChain'
import { OpStackL1Contract } from '../../../types/opStackContracts'
import { simulateOpStackL1, SimulateOpStackL1Parameters } from './simulateOpStackL1'

export type SimulateDepositERC20Parameters<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined = Chain & GetL1ChainId<TL2Chain> | undefined,
  _abi extends typeof l1StandardBridgeABI = typeof l1StandardBridgeABI,
  _contractName extends OpStackL1Contract = OpStackL1Contract.OptimismL1StandardBridge,
  _functionName extends string = 'depositERC20',
> =
  & { args: DepositERC20Parameters }
  & SimulateActionBaseType<TL2Chain, TChain, TChainOverride, _abi, _contractName, _functionName>

/**
 * Simulates a deposit of ERC20 tokens to L2
 * @param {SimulateDepositERC20Parameters} args {@link SimulateDepositERC20Parameters}
 * @param {OpChainL2} toChain the L2 chain to deposit to
 * @returns {SimulateDepositERC20ReturnType} the simulated transaction
 */
export async function simulateDepositERC20<
  TL2Chain extends OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain>,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined,
  _abi extends typeof l1StandardBridgeABI = typeof l1StandardBridgeABI,
  _functionName extends string = 'depositERC20',
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { l1Token, l2Token, amount, gasLimit, data },
    optimismL1StandardBridgeAddress,
    ...rest
  }: SimulateDepositERC20Parameters<TL2Chain, TChain, TChainOverride>,
): Promise<SimulateContractReturnType<_abi, _functionName, TChain, TChainOverride>> {
  return simulateOpStackL1(client, {
    address: optimismL1StandardBridgeAddress,
    abi: l1StandardBridgeABI,
    contract: OpStackL1Contract.OptimismL1StandardBridge,
    functionName: 'depositERC20',
    args: [l1Token, l2Token, amount, gasLimit, data || '0x'],
    ...rest,
  } as unknown as SimulateOpStackL1Parameters<TL2Chain, TChain, TChainOverride, _abi, _functionName>)
}
