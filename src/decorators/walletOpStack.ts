import { Account, Chain, Transport } from 'viem'
import { WalletClient } from 'wagmi'
import { bridgeWriteContract } from '../actions/wallet/bridgeWriteContract'
import { bridgeSendTransaction } from '../actions/wallet/bridgeSendTransaction'
import { writeDepositETH } from '../actions/wallet/writeDepositETH'
import { writeDepositERC20 } from '../actions/wallet/writeDepositERC20'

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
  writeDepositETH: (
    // TODO name these params
    args: Parameters<typeof writeDepositETH>[1],
  ) => Promise<string>
  writeDepositERC20: (
    // TODO name these params
    args: Parameters<typeof writeDepositERC20>[1],
  ) => Promise<string>
}

export function publicOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
>(client: WalletClient<TTransport, TChain, TAccount>): WalletOpStackActions {
  // TODO none of these decorators are generic
  // Need to infer args on all of these
  return {
    // TODO do better than as any
    bridgeWriteContract: (args) => bridgeWriteContract(client as any, args),
    // TODO do better than as any
    bridgeSendTransaction: (args) => bridgeSendTransaction(client as any, args),
    // TODO do better than as any
    writeDepositETH: (args) => writeDepositETH(client as any, args),
    writeDepositERC20: (args) => writeDepositERC20(client as any, args),
  }
}
