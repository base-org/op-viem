import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Account, Chain, Transport, WalletClient, WriteContractParameters, WriteContractReturnType } from 'viem'
import { writeContract } from 'viem/actions'
import { ResolveChain, WriteActionBaseType } from '../../../types/actions'
import { DepositETHParameters } from '../../../types/depositETHParameters'
import { OpStackL1Contracts } from '../../../types/opStackContracts'
import { ContractToChainAddressMapping } from './writeUnsafeDepositTransaction'

export type WriteDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _contractName extends OpStackL1Contracts = OpStackL1Contracts.optimismL1StandardBridge,
  _functionName extends string = 'depositETH',
  _resolvedChain extends Chain | undefined = ResolveChain<
    TChain,
    TChainOverride
  >,
> =
  & {
    args: DepositETHParameters
  }
  & WriteActionBaseType<
    TChain,
    TAccount,
    typeof l1StandardBridgeABI,
    TChainOverride,
    _contractName,
    _functionName,
    _resolvedChain
  >

/**
 * Deposits ETH to L2
 * @param {bigint} gasLimit the gas limit for the transaction
 * @param {Hex} [data] the data to send with the transaction
 * @returns {WriteContractReturnType} the transaction hash
 */
export async function writeDepositETH<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { gasLimit, data },
    chain = client.chain,
    l2ChainId,
    optimismL1StandardBridgeAddress,
    ...rest
  }: WriteDepositETHParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  const contracts = chain?.contracts as
    | ContractToChainAddressMapping
    | undefined
  const bridge = optimismL1StandardBridgeAddress
    || (contracts && typeof l2ChainId === 'number'
      ? contracts[OpStackL1Contracts.optimismL1StandardBridge][l2ChainId]
      : undefined)
  return writeContract(client, {
    address: bridge,
    abi: l1StandardBridgeABI,
    functionName: 'depositETH',
    args: [gasLimit, data],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof l1StandardBridgeABI,
    'depositETH',
    TChain,
    TAccount,
    TChainOverride
  >)
}
