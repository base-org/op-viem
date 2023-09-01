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
import { writeContract } from 'viem/actions'
import { OpStackL1Contracts } from '../../../types/opStackContracts'
import {
  ExtractValidChainIdFromContract,
  ResolveChain,
} from '../../../types/actions'

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
}

// TODO(wilson): remove after viem updates types
type ContractToChainAddressMapping = {
  [key: string]: { [chainId: number]: Address }
}

export type WriteUnsafeDepositTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _contractName extends OpStackL1Contracts = OpStackL1Contracts.optimismPortal,
  _resolvedChain extends Chain | undefined = ResolveChain<
    TChain,
    TChainOverride
  >,
> = Omit<
  WriteContractParameters<
    typeof optimismPortalABI,
    'depositTransaction',
    TChain,
    TAccount,
    TChainOverride
  >,
  'abi' | 'functionName' | 'args' | 'address' | 'chain'
> &
  (
    | {
        chain?: TChain
        toChainId: ExtractValidChainIdFromContract<
          _resolvedChain,
          _contractName
        >
        optimismPortal?: never
        args: DepositTransactionParameters
      }
    | {
        chain?: TChain
        toChainId?: never
        optimismPortal?: Address
        args: DepositTransactionParameters
      }
  )

export async function writeUnsafeDepositTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, value, gasLimit, isCreation, data },
    toChainId,
    optimismPortal,
    chain = client.chain,
    ...rest
  }: WriteUnsafeDepositTransactionParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  if (!chain) {
    throw new Error('Chain not defined')
  }
  const contracts = chain['contracts'] as
    | ContractToChainAddressMapping
    | undefined
  const portal =
    optimismPortal ||
    (contracts && contracts[OpStackL1Contracts.optimismPortal] && toChainId
      ? contracts[OpStackL1Contracts.optimismPortal][toChainId]
      : undefined)
  if (!portal) {
    throw new Error('Portal not defined')
  }
  return writeContract(client, {
    address: portal,
    abi: optimismPortalABI,
    functionName: 'depositTransaction' as any,
    args: [to, value || 0n, gasLimit, isCreation || false, data || '0x'],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof optimismPortalABI,
    'depositTransaction',
    TChain,
    TAccount,
    TChainOverride
  >)
}
