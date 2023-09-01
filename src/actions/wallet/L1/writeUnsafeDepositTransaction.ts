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

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
}

enum OpStackL1Contracts {
  optimismPortal = 'optimismPortal',
}

type OpStackContracts = {
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

type ExtractValidChainIdFromContract<
  TChain extends Chain | undefined,
  contractName extends OpStackL1Contracts,
> = TChain extends Chain
  ? TChain['contracts'] extends { [key: string]: unknown }
    ? TChain['contracts'][contractName] extends { [chainId: number]: Address }
      ? keyof TChain['contracts'][contractName]
      : undefined
    : undefined
  : undefined
type ResolveChain<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = TChainOverride extends Chain ? TChainOverride : TChain
// type GetChain<TChain extends Chain | undefined, TChainOverride extends Chain | undefined = undefined> = IsUndefined<TChain> extends true ? { chain: TChain | null} : {chain?: TChainOverride | null}

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
    throw new Error('chain must be defined')
  }
  const contracts = chain['contracts'] as { [key: string]: unknown }
  const portalContracts = contracts[OpStackL1Contracts.optimismPortal] as {
    [chainId: number]: Address
  }
  const portal =
    optimismPortal || (toChainId ? portalContracts[toChainId] : undefined)
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
