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
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { writeContract } from 'viem/actions'

type DepositTransactionParameters = {
  to: Address
  value: bigint
  gasLimit: bigint
  isCreation: boolean
  data: Hex
}

type WriteUnsafeDepositTransactionParameters<
  TAbi extends Abi | readonly unknown[] = typeof optimismPortalABI,
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
  args: DepositTransactionParameters
}

export async function writeUnsafeDepositTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  const TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain>,
  {
    args: { to, value, gasLimit, isCreation, data },
    toChain,
    ...rest
  }: WriteUnsafeDepositTransactionParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: toChain.opContracts.OptimismPortalProxy,
    abi: optimismPortalABI,
    functionName: 'depositTransaction',
    args: [to, value, gasLimit, isCreation, data],
    ...rest,
  } as unknown as WriteContractParameters<Abi | readonly unknown[], string, TChain, Account | undefined, undefined>)
}
