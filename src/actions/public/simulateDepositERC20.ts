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
import { DepositERC20Parameters } from '../../types/depositERC20Parameters'

export type SimulateDepositERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof l1StandardBridgeABI,
    'depositERC20',
    TChain,
    TChainOverride
  >,
  'abi' | 'functionName' | 'args' | 'address'
> & {
  toChain: OpChainL2
  args: DepositERC20Parameters
}

export async function simulateDepositERC20<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: PublicClient<Transport, TChain>,
  {
    args: { l1Token, l2Token, amount, gasLimit, data },
    toChain,
    ...rest
  }: SimulateDepositERC20Parameters<TChain, TChainOverride>,
): Promise<
  SimulateContractReturnType<
    typeof l1StandardBridgeABI,
    'depositERC20',
    TChain,
    TChainOverride
  >
> {
  return simulateContract(client, {
    address: toChain.opContracts.L1StandardBridgeProxy,
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
