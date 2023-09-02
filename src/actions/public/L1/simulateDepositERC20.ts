import {
  Transport,
  PublicClient,
  Chain,
  SimulateContractParameters,
  SimulateContractReturnType,
} from 'viem'
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { simulateContract } from 'viem/actions'
import { DepositERC20Parameters } from '../../../types/depositERC20Parameters'
import { ResolveChain, SimulateActionBaseType } from '../../../types/actions'
import { OpStackL1Contracts } from '../../../types/opStackContracts'
import { ContractToChainAddressMapping } from '../../wallet/L1/writeUnsafeDepositTransaction'

export type SimulateDepositERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _contractName extends OpStackL1Contracts = OpStackL1Contracts.optimismL1StandardBridge,
  _functionName extends string = 'depositERC20',
  _resolvedChain extends Chain | undefined = ResolveChain<
    TChain,
    TChainOverride
  >,
> = { args: DepositERC20Parameters } & SimulateActionBaseType<
  TChain,
  typeof l1StandardBridgeABI,
  TChainOverride,
  _contractName,
  _functionName,
  _resolvedChain
>

export type SimulateDepositERC20ReturnType<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = SimulateContractReturnType<
  typeof l1StandardBridgeABI,
  'depositERC20',
  TChain,
  TChainOverride
>

export async function simulateDepositERC20<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { l1Token, l2Token, amount, gasLimit, data },
    l2ChainId,
    optimismL1StandardBridgeAddress,
    chain = client.chain,
    ...rest
  }: SimulateDepositERC20Parameters<TChain, TChainOverride>,
): Promise<SimulateDepositERC20ReturnType<TChain, TChainOverride>> {
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
    functionName: 'depositERC20',
    args: [l1Token, l2Token, amount, gasLimit, data],
    ...rest,
  } as unknown as SimulateContractParameters<
    typeof l1StandardBridgeABI,
    'depositERC20',
    TChain,
    TChainOverride
  >)
}
