import {
  Transport,
  WalletClient,
  Chain,
  Account,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { writeContract } from 'viem/actions'
import { DepositETHParameters } from '../../types/depositETHParameters'

export type WriteDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof l1StandardBridgeABI,
    'depositETH',
    TChain,
    TAccount,
    TChainOverride
  >,
  'abi' | 'functionName' | 'args' | 'address' | 'value'
> & {
  toChain: OpChainL2
  args: DepositETHParameters
  value: bigint
}

export async function writeDepositETH<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { gasLimit, data },
    toChain,
    ...rest
  }: WriteDepositETHParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: toChain.opContracts.L1StandardBridgeProxy,
    abi: l1StandardBridgeABI,
    functionName: 'depositETH',
    args: [gasLimit, data],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof l1StandardBridgeABI,
    'depositETH',
    TChain,
    TAccount,
    TChainOverride
  >)
}
