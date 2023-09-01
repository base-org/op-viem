import {
  Transport,
  PublicClient,
  Chain,
  SimulateContractParameters,
  SimulateContractReturnType,
} from 'viem'
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { simulateContract } from 'viem/actions'
import { DepositETHParameters } from '../../../types/depositETHParameters'

export type SimulateDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof l1StandardBridgeABI,
    'depositETH',
    TChain,
    TChainOverride
  >,
  'abi' | 'functionName' | 'args' | 'address'
> & {
  toChain: OpChainL2
  args: DepositETHParameters
}

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
    toChain,
    ...rest
  }: SimulateDepositETHParameters<TChain, TChainOverride>,
): Promise<SimulateDepositETHReturnType<TChain, TChainOverride>> {
  return simulateContract(client, {
    address: toChain.opContracts.L1StandardBridgeProxy,
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
