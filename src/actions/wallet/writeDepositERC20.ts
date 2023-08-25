import {
  Transport,
  WalletClient,
  Chain,
  Account,
  WriteContractParameters,
  WriteContractReturnType,
  Address,
  Hex,
  Abi,
} from 'viem'
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { writeContract } from 'viem/actions'

type DepositERC20Parameters = {
  l1Token: Address
  l2Token: Address
  amount: bigint
  gasLimit: bigint
  data: Hex
}

type WriteDepositERC20Parameters<
  TAbi extends Abi | readonly unknown[] = typeof l1StandardBridgeABI,
  TFunctionName extends string = 'depositERC20',
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >,
  'abi' | 'functionName' | 'args' | 'address'
> & {
  toChain: OpChainL2
  args: DepositERC20Parameters
}

export interface WriteDepositERC20 {
  <
    TChain extends Chain | undefined,
    TAccount extends Account | undefined,
    TAbi extends Abi | readonly unknown[],
    TFunctionName extends string,
    TChainOverride extends Chain | undefined,
  >(
    client: WalletClient<Transport, TChain, TAccount>,
    {
      args: { l1Token, l2Token, amount, gasLimit, data },
      toChain,
      ...rest
    }: WriteDepositERC20Parameters<
      TAbi,
      TFunctionName,
      TChain,
      TAccount,
      TChainOverride
    >,
  ): Promise<WriteContractReturnType>
}

export const writeDepositERC20: WriteDepositERC20 = async (
  client,
  { args: { l1Token, l2Token, amount, gasLimit, data }, toChain, ...rest },
) => {
  return writeContract(client, {
    address: toChain.opContracts.OptimismPortalProxy,
    abi: l1StandardBridgeABI,
    functionName: 'depositERC20',
    args: [l1Token, l2Token, amount, gasLimit, data],
    ...rest,
  } as any)
}
