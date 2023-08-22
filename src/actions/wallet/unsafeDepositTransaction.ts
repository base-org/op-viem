import {
  Transport,
  WalletClient,
  Chain,
  Account,
  WriteContractParameters,
  WriteContractReturnType,
  Address,
  Hex,
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
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
> = Omit<
  WriteContractParameters,
  'abi' | 'functionName' | 'args' | 'accessList' | 'address'
> & {
  toChain: OpChainL2
  args: DepositTransactionParameters
}

export async function writeUnsafeDepositTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain>,
  {
    args: { to, value, gasLimit, isCreation, data },
    toChain,
    ...rest
  }: WriteUnsafeDepositTransactionParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: toChain.opContracts.OptimismPortalProxy,
    abi: optimismPortalABI,
    functionName: 'depositTransaction',
    args: [to, value, gasLimit, isCreation, data],
    ...rest,
  })
}
