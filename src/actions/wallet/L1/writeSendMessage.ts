import { ResolveChain, WriteActionBaseType } from '../../../types/actions'
import { OpStackL1Contracts } from '../../../types/opStackContracts'
import { ContractToChainAddressMapping } from './writeUnsafeDepositTransaction'
import {
  l1CrossDomainMessengerABI,
  l1StandardBridgeABI,
} from '@eth-optimism/contracts-ts'
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

export type SendMessageParams = {
  target: Address
  minGasLimit: number
  message?: Hex
}

export type WriteSendMessageParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _contractName extends OpStackL1Contracts = OpStackL1Contracts.optimismL1CrossDomainMessenger,
  _functionName extends string = 'sendMessage',
  _resolvedChain extends Chain | undefined = ResolveChain<
    TChain,
    TChainOverride
  >,
> = {
  args: SendMessageParams
} & WriteActionBaseType<
  TChain,
  TAccount,
  typeof l1StandardBridgeABI,
  TChainOverride,
  _contractName,
  _functionName,
  _resolvedChain
>

export async function writeSendMessage<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { target, message = '0x', minGasLimit },
    chain = client.chain,
    l2ChainId,
    optimismL1CrossDomainMessengerAddress,
    ...rest
  }: WriteSendMessageParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  const contracts = chain?.contracts as
    | ContractToChainAddressMapping
    | undefined
  const messenger =
    optimismL1CrossDomainMessengerAddress ||
    (contracts && typeof l2ChainId === 'number'
      ? contracts[OpStackL1Contracts.optimismL1CrossDomainMessenger][l2ChainId]
      : undefined)
  return writeContract(client, {
    address: messenger,
    abi: l1CrossDomainMessengerABI,
    functionName: 'sendMessage',
    args: [target, message, minGasLimit],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof l1CrossDomainMessengerABI,
    'sendMessage',
    TChain,
    TAccount,
    TChainOverride
  >)
}
