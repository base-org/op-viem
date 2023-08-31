import { Account, Chain, Transport, WriteContractReturnType } from 'viem'
import { WalletClient } from 'wagmi'
import { bridgeWriteContract } from '../actions/wallet/L1/bridgeWriteContract'
import {
  writeUnsafeDepositTransaction,
  WriteUnsafeDepositTransactionParameters,
} from '../actions/wallet/L1/writeUnsafeDepositTransaction'
import {
  writeDepositETH,
  WriteDepositETHParameters,
} from '../actions/wallet/L1/writeDepositETH'
import {
  writeDepositERC20,
  WriteDepositERC20Parameters,
} from '../actions/wallet/L1/writeDepositERC20'
import { OpStackL1Chain } from '../types/opStackChain'

export type WalletL1OpStackActions<
  TChain extends OpStackL1Chain | undefined = OpStackL1Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
> = {
  // bridgeWriteContract: (
  //   // TODO name these params
  //   args: Parameters<typeof bridgeWriteContract>[1],
  // ) => Promise<string>
  // writeDepositETH: <
  //   TChainOverride extends OpStackL1Chain | undefined = OpStackL1Chain | undefined,
  // >(
  //   args: WriteDepositETHParameters<TChain, TAccount, TChainOverride>,
  // ) => Promise<WriteContractReturnType>
  // writeDepositERC20: <
  //   TChainOverride extends Chain | undefined = Chain | undefined,
  // >(
  //   args: WriteDepositERC20Parameters<TChain, TAccount, TChainOverride>,
  // ) => Promise<WriteContractReturnType>
  writeUnsafeDepositTransaction: <
    TChainOverride extends OpStackL1Chain | undefined = OpStackL1Chain | undefined,
  >(
    args: WriteUnsafeDepositTransactionParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<WriteContractReturnType>
}

export function walletL1OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends OpStackL1Chain = OpStackL1Chain,
  TAccount extends Account = Account,
>(
  client: WalletClient<TTransport, TChain, TAccount>,
): WalletL1OpStackActions<TChain, TAccount> {
  return {
    // TODO do better than as any
    // bridgeWriteContract: (args) => bridgeWriteContract(client as any, args),
    writeUnsafeDepositTransaction: (args) =>
      writeUnsafeDepositTransaction(client, args),
    // writeDepositETH: (args) => writeDepositETH(client, args),
    // writeDepositERC20: (args) => writeDepositERC20(client, args),
  }
}
