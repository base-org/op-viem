import { Account, Chain, Transport, WriteContractReturnType } from 'viem'
import { WalletClient } from 'wagmi'
import { bridgeWriteContract } from '../actions/wallet/bridgeWriteContract'
import {
  WriteUnsafeDepositTransactionParameters,
  writeUnsafeDepositTransaction,
} from '../actions/wallet/writeUnsafeDepositTransaction'

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
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: WriteUnsafeDepositTransactionParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<WriteContractReturnType>
}

export function walletOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
>(
  client: WalletClient<TTransport, TChain, TAccount>,
): WalletOpStackActions<TChain, TAccount> {
  return {
    // TODO do better than as any
    bridgeWriteContract: (args) => bridgeWriteContract(client as any, args),
    writeUnsafeDepositTransaction: (args) =>
      writeUnsafeDepositTransaction(client, args),
  }
}
