import {
  Transport,
  WalletClient,
  WriteContractReturnType,
  Address,
  Hex,
} from 'viem'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { writeContract } from 'viem/actions'
import { WalletRollupActionType } from './types'

type DepositTransactionParameters = {
  to: Address
  value: bigint
  gasLimit: bigint
  isCreation: boolean
  data: Hex
}

export type WriteUnsafeDepositTransactionParameters<
  T extends WalletRollupActionType,
> = {
  toChain: T['TRollupChain']
  args: DepositTransactionParameters
}

export async function writeUnsafeDepositTransaction<
  T extends WalletRollupActionType,
>(
  client: WalletClient<Transport, T['TChain'], T['TAccount']>,
  {
    args: { to, value, gasLimit, isCreation, data },
    toChain,
    ...rest
  }: WriteUnsafeDepositTransactionParameters<T>,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: toChain.opContracts.OptimismPortalProxy,
    abi: optimismPortalABI,
    functionName: 'depositTransaction',
    args: [to, value, gasLimit, isCreation, data],
    ...rest,
  } as any)
}
