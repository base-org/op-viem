import { Account, Chain, Transport } from 'viem'
import { WalletClient } from 'wagmi'
import { bridgeWriteContract } from '../actions/wallet/bridgeWriteContract'
import {
  writeUnsafeDepositTransaction,
  WriteUnsafeDepositTransaction,
} from '../actions/wallet/writeUnsafeDepositTransaction'
import {
  writeDepositETH,
  WriteDepositETH,
} from '../actions/wallet/writeDepositETH'
import {
  writeDepositERC20,
  WriteDepositERC20,
} from '../actions/wallet/writeDepositERC20'
import { DecoratedAction } from '../types/decoratedAction'

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
  writeUnsafeDepositTransaction: DecoratedAction<WriteUnsafeDepositTransaction>
  writeDepositETH: DecoratedAction<WriteDepositETH>
  writeDepositERC20: DecoratedAction<WriteDepositERC20>
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
    writeDepositETH: (args) => writeDepositETH(client, args),
    writeDepositERC20: (args) => writeDepositERC20(client, args),
  }
}
