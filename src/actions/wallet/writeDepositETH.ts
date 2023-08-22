import {
  Transport,
  WalletClient,
  Chain,
  Account,
  WriteContractParameters,
  WriteContractReturnType,
  Hex,
  Abi,
} from 'viem'
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { writeContract } from 'viem/actions'

type DepositETHParameters = {
  gasLimit: bigint
  data: Hex
}

type WriteDepositETH<
  TAbi extends Abi | readonly unknown[] = typeof l1StandardBridgeABI,
  TFunctionName extends string = 'writeDepositETH',
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
  'abi' | 'functionName' | 'args' | 'address' | 'value'
> & {
  toChain: OpChainL2
  args: DepositETHParameters
  value: bigint
}

export async function writeDepositETH<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  const TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain>,
  {
    args: { gasLimit, data },
    value,
    toChain,
    ...rest
  }: WriteDepositETH<TAbi, TFunctionName, TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: toChain.opContracts.OptimismPortalProxy,
    abi: l1StandardBridgeABI,
    functionName: 'depositETH',
    args: [gasLimit, data],
    value,
    ...rest,
  } as any)
}
