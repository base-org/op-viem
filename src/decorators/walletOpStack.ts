import { Account, Chain, Transport } from 'viem'
import { WalletClient } from 'wagmi'
import { bridgeWriteContract } from '../actions/bridgeWriteContract'
import { bridgeSendTransaction } from '../actions/bridgeSendTransaction'

/// NOTE We don't currently need account for exisiting actions but keeping in case
// TODO need to add generics
export type WalletOpStackActions = {
  bridgeWriteContract: (
    // TODO name these params
    args: Parameters<typeof bridgeWriteContract>[1],
  ) => Promise<string>
  bridgeSendTransaction: (
    // TODO name these params
    args: Parameters<typeof bridgeSendTransaction>[1],
  ) => Promise<string>
}

export function publicOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account
>(
  client: WalletClient<TTransport, TChain, TAccount>,
): WalletOpStackActions {
  // TODO none of these decorators are generic
  // Need to infer args on all of these
  return {
    // TODO do better than as any
    bridgeWriteContract: (args) => bridgeWriteContract(client as any, args),
    // TODO do better than as any
    bridgeSendTransaction: (args) => bridgeSendTransaction(client as any, args)
  }
}
