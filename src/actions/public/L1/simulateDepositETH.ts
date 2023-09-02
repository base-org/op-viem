import {
  Transport,
  PublicClient,
  Chain,
  SimulateContractParameters,
  SimulateContractReturnType,
} from 'viem'
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { simulateContract } from 'viem/actions'
import { DepositETHParameters } from '../../../types/depositETHParameters'
import { ResolveChain, SimulateActionBaseType } from '../../../types/actions'
import { OpStackL1Contracts } from '../../../types/opStackContracts'
import { ContractToChainAddressMapping } from '../../wallet/L1/writeUnsafeDepositTransaction'

export type SimulateDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _contractName extends OpStackL1Contracts = OpStackL1Contracts.optimismL1StandardBridge,
  _functionName extends string = 'depositETH',
  _resolvedChain extends Chain | undefined = ResolveChain<
    TChain,
    TChainOverride
  >
> = & {
  args: DepositETHParameters
} & SimulateActionBaseType<
  TChain,
  typeof l1StandardBridgeABI,
  TChainOverride,
  _contractName,
  _functionName,
  _resolvedChain
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
  const bridge =
    optimismL1StandardBridgeAddress ||
    (contracts && typeof l2ChainId == 'number'
      ? contracts[OpStackL1Contracts.optimismL1StandardBridge][l2ChainId]
      : undefined)
  return simulateContract(client, {
    address: bridge,
    abi: l1StandardBridgeABI,
    functionName: 'depositETH',
    args: [gasLimit, data],
    ...rest,
  } as unknown as SimulateContractParameters<
    typeof l1StandardBridgeABI,
    'depositETH',
    TChain,
    TChainOverride
  >)
}
