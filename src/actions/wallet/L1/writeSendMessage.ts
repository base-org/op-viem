import { l1CrossDomainMessengerABI } from '@eth-optimism/contracts-ts'
import type {
  Account,
  Address,
  Chain,
  ContractFunctionArgs,
  Hex,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'

const ABI = l1CrossDomainMessengerABI
const FUNCTION = 'sendMessage'

export type SendMessageParameters = {
  target: Address
  minGasLimit: number
  message?: Hex
}

export type WriteSendMessageParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: SendMessageParameters; l1CrossDomainMessenger: RawOrContractAddress<_chainId> }
  & L1WriteActionBaseType<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
    TChain,
    TAccount,
    TChainOverride
  >

/**
 * A generic, low-level way to make a L1 -> L2 call with replayability.
 * Calls sendMessage on the L1CrossDomainMessenger contract.
 *
 * @param parameters - {@link WriteSendMessageParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeSendMessage<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { target, minGasLimit, message = '0x' },
    l1CrossDomainMessenger,
    ...rest
  }: WriteSendMessageParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: resolveAddress(l1CrossDomainMessenger),
    abi: ABI,
    functionName: FUNCTION,
    args: [target, message, minGasLimit],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<
      typeof ABI,
      'payable',
      typeof FUNCTION
    >,
    TChain,
    TAccount,
    TChainOverride
  >)
}
