import { Abi, Account, Chain, Transport, WriteContractReturnType } from 'viem'
import { WalletClient } from 'wagmi'
import { bridgeWriteContract } from '../actions/wallet/bridgeWriteContract'
import {
  WriteUnsafeDepositTransactionParameters,
  writeUnsafeDepositTransaction,
} from '../actions/wallet/writeUnsafeDepositTransaction'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { bridgeSendTransaction } from '../actions/wallet/bridgeSendTransaction'
import { bridgeETH } from '../actions/wallet/bridgeETH'

/// NOTE We don't currently need account for exisiting actions but keeping in case
// TODO need to add generics
export type WalletOpStackActions<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
> = {
  bridgeWriteContract: (
    // TODO name these params
    args: Parameters<typeof bridgeWriteContract>[1],
  ) => Promise<string>
  writeUnsafeDepositTransaction: <
    TAbi extends Abi | readonly unknown[] = typeof optimismPortalABI,
    TFunctionName extends string = 'depositTransaction',
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: WriteUnsafeDepositTransactionParameters<
      TAbi,
      TFunctionName,
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<WriteContractReturnType>
  bridgeSendTransaction: (
    // TODO name these params
    args: Parameters<typeof bridgeSendTransaction>[1],
  ) => Promise<string>
  bridgeETH: (
    // TODO name these params
    args: Parameters<typeof bridgeETH>[1],
  ) => Promise<string>
}

export function walletOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
>(
  client: WalletClient<TTransport, TChain, TAccount>,
): WalletOpStackActions<TChain, TAccount> {
  return {
    bridgeWriteContract: (args) => bridgeWriteContract(client as any, args),
    writeUnsafeDepositTransaction: (args) =>
      writeUnsafeDepositTransaction(client, args),
    bridgeSendTransaction: (args) => bridgeSendTransaction(client as any, args),
    // TODO do better than as any
    bridgeETH: (args) => bridgeETH(client as any, args)
  }
}
