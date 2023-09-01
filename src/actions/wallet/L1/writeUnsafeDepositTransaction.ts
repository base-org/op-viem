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
  GetContractAddress,
  GetTo,
  ResolveChain,
} from '../../../types/actions'
import { IsUndefined } from 'viem/dist/types/types/utils'

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
> & {
  chain?: TChain | TChainOverride
  args: DepositTransactionParameters
} & GetTo<_resolvedChain, _contractName> &
  GetContractAddress<_resolvedChain, _contractName>

export async function writeUnsafeDepositTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, value, gasLimit, isCreation, data },
    toChainId,
    optimismPortalAddress,
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
    optimismPortalAddress ||
    (contracts &&
    contracts[OpStackL1Contracts.optimismPortal] &&
    typeof toChainId == 'number'
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
