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

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
}

export type WriteUnsafeDepositTransactionParameters<
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

export interface WriteUnsafeDepositTransaction {
  <
    TChain extends Chain | undefined,
    TAccount extends Account | undefined,
    TAbi extends Abi | readonly unknown[],
    TFunctionName extends string,
    TChainOverride extends Chain | undefined,
  >(
    client: WalletClient<Transport, TChain, TAccount>,
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
  ): Promise<WriteContractReturnType>
}

export const writeUnsafeDepositTransaction: WriteUnsafeDepositTransaction =
  async (
    client,
    { args: { to, value, gasLimit, isCreation, data }, toChain, ...rest },
  ) => {
    return writeContract(client, {
      address: toChain.opContracts.OptimismPortalProxy,
      abi: optimismPortalABI,
      functionName: 'depositTransaction',
      args: [to, value || 0n, gasLimit, isCreation || false, data || '0x'],
      ...rest,
    } as any)
  }
