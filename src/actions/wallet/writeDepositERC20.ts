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

type WriteDepositERC20<
  TAbi extends Abi | readonly unknown[] = typeof l1StandardBridgeABI,
  TFunctionName extends string = 'depositTransaction',
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

export async function writeDepositERC20<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  const TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain>,
  {
    args: { l1Token, l2Token, amount, gasLimit, data },
    toChain,
    ...rest
  }: WriteDepositERC20<TAbi, TFunctionName, TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: toChain.opContracts.OptimismPortalProxy,
    abi: l1StandardBridgeABI,
    functionName: 'depositERC20',
    args: [l1Token, l2Token, amount, gasLimit, data],
    ...rest,
  } as any)
}
