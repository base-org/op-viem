import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Chain, PublicClient, SimulateContractParameters, SimulateContractReturnType, Transport } from 'viem'
import { simulateContract } from 'viem/actions'
import { GetL1ChainId, SimulateActionBaseType } from '../../../types/actions'
import { DepositETHParameters } from '../../../types/depositETHParameters'
import { OpStackChain, OpStackL1Contract } from '../../../types/opStackContracts'

export type SimulateDepositETHParameters<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined = Chain & GetL1ChainId<TL2Chain> | undefined,
  _contractName extends OpStackL1Contract = OpStackL1Contract.OptimismL1StandardBridge,
  _functionName extends string = 'depositETH',
> =
  & {
    args: DepositETHParameters
  }
  & SimulateActionBaseType<
    TL2Chain,
    TChain,
    TChainOverride,
    typeof l1StandardBridgeABI,
    _contractName,
    _functionName
  >
export type SimulateDepositETHReturnType<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = SimulateContractReturnType<
  typeof l1StandardBridgeABI,
  'depositETH',
  TChain,
  TChainOverride
>

/**
 * Simulates a deposit of ETH to L2
 * @param {SimulateDepositETHParameters} args {@link SimulateDepositETHParameters}
 * @param {OpChainL2} toChain the L2 chain to deposit to
 * @returns {SimulateDepositETHReturnType} the simulated transaction
 */
export async function simulateDepositETH<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { gasLimit, data },
    l2ChainId,
    optimismL1StandardBridgeAddress,
    chain = client.chain,
    ...rest
  }: SimulateDepositETHParameters<TChain, TChainOverride>,
): Promise<SimulateDepositETHReturnType<TChain, TChainOverride>> {
  const contracts = chain?.contracts as
    | ContractToChainAddressMapping
    | undefined
  const bridge = optimismL1StandardBridgeAddress
    || (contracts && typeof l2ChainId === 'number'
      ? contracts[OpStackL1Contracts.optimismL1StandardBridge][l2ChainId]
      : undefined)
  return simulateContract(client, {
    address: bridge,
    abi: l1StandardBridgeABI,
    functionName: 'depositETH',
    args: [gasLimit, data || '0x'],
    ...rest,
  } as unknown as SimulateContractParameters<
    typeof l1StandardBridgeABI,
    'depositETH',
    TChain,
    TChainOverride
  >)
}
