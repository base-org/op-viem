import {
  type Abi,
  type Account,
  type Chain,
  encodeFunctionData,
  type EncodeFunctionDataParameters,
  type Transport,
  type WalletClient,
  type WriteContractParameters,
  type WriteContractReturnType,
} from 'viem'
import { OpStackL1Contract } from '../../../index.js'
import type { GetL2Chain, L1ActionBaseType, ResolveChain } from '../../../types/l1Actions.js'
import { writeSendMessage, type WriteSendMessageParameters } from './writeSendMessage.js'

export type WriteContractDepositParameters<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { minGasLimit: number }
  & L1ActionBaseType<GetL2Chain<ResolveChain<TChain, TChainOverride>>, typeof OpStackL1Contract.L1CrossDomainMessenger>
  & WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >

/**
 * A L1 -> L2 version of Viem's writeContract. Can be used to call any L2 contract from L1.
 * Internally uses writeSendMessage, which calls to the cross chain messenger contract.
 * NOTE: msg.sender on the call to `address` will NOT be msg.sender on L1, but the L2CrossDomainMessenger.
 *
 * @param parameters - {@link WriteContractDepositParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeContractDeposit<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  const TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    abi,
    address,
    args,
    functionName,
    minGasLimit,
    l2Chain,
    l1CrossDomainMessengerAddress,
    ...request
  }: WriteContractDepositParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  const calldata = encodeFunctionData({
    abi,
    args,
    functionName,
  } as unknown as EncodeFunctionDataParameters<TAbi, TFunctionName>)
  return writeSendMessage(client, {
    l1CrossDomainMessengerAddress,
    l2Chain,
    args: { minGasLimit, target: address, message: calldata },
    ...request,
  } as unknown as WriteSendMessageParameters<TChain, TAccount, TChainOverride>)
}
