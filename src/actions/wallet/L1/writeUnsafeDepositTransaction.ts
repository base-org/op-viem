import {
  GetContractAddress,
  GetL2ChainId,
  ResolveChain,
  WriteActionBaseType,
} from '../../../types/actions'
import { OpStackL1Contracts } from '../../../types/opStackContracts'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import {
  Account,
  Address,
  Chain,
  Hex,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
}

// TODO(wilson): remove after viem updates types
export type ContractToChainAddressMapping = {
  [key: string]: { [chainId: number]: Address }
}

export type WriteUnsafeDepositTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _contractName extends OpStackL1Contracts = OpStackL1Contracts.optimismPortal,
  _functionName extends string = 'depositTransaction',
  _resolvedChain extends Chain | undefined = ResolveChain<
    TChain,
    TChainOverride
  >,
> = {
  args: DepositTransactionParameters
} & WriteActionBaseType<
  TChain,
  TAccount,
  typeof optimismPortalABI,
  TChainOverride,
  _contractName,
  _functionName,
  _resolvedChain
>

/**
 * Write directly to the Portal proxy to deposit ETH to L2
 *
 * @param {Address} to the address to send the transaction to
 * @param {bigint} [value] the amount of ETH to send
 * @param {bigint} gasLimit the gas limit for the transaction
 * @param {boolean} [isCreation] whether or not the transaction is a contract creation
 * @param {Hex} [data] the data to send with the transaction
 * @returns {WriteContractReturnType} the transaction hash
 */
export async function writeUnsafeDepositTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, value, gasLimit, isCreation, data },
    l2ChainId,
    optimismPortalAddress,
    chain = client.chain,
    ...rest
  }: WriteUnsafeDepositTransactionParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  if (!chain) {
    throw new Error('Chain not defined')
  }
  const contracts = chain.contracts as ContractToChainAddressMapping | undefined
  const portal =
    optimismPortalAddress ||
    (contracts?.[OpStackL1Contracts.optimismPortal] &&
    typeof l2ChainId === 'number'
      ? contracts[OpStackL1Contracts.optimismPortal][l2ChainId]
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
