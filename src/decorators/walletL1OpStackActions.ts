import type { Account, Chain, Transport, WriteContractReturnType } from 'viem'
import type { WalletClient } from 'viem'
import { writeDepositERC20, type WriteDepositERC20Parameters } from '../actions/wallet/L1/writeDepositERC20.js'
import { writeDepositETH, type WriteDepositETHParameters } from '../actions/wallet/L1/writeDepositETH.js'
import {
  writeDepositTransaction,
  type WriteDepositTransactionParameters,
} from '../actions/wallet/L1/writeDepositTransaction.js'
import {
  writeFinalizeWithdrawalTranasction,
  type WriteFinalizeWithdrawalTransactionParameters,
} from '../actions/wallet/L1/writeFinalizeWithdrawalTransaction.js'
import {
  writeProveWithdrawalTransaction,
  type WriteProveWithdrawalTransactionParameters,
} from '../actions/wallet/L1/writeProveWithdrawalTransaction.js'

export type WalletL1OpStackActions<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
> = {
  writeDepositETH: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: WriteDepositETHParameters<TChain, TAccount, TChainOverride>,
  ) => Promise<WriteContractReturnType>
  writeDepositERC20: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: WriteDepositERC20Parameters<TChain, TAccount, TChainOverride>,
  ) => Promise<WriteContractReturnType>
  writeDepositTransaction: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: WriteDepositTransactionParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<WriteContractReturnType>
  writeProveWithdrawalTransaction: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: WriteProveWithdrawalTransactionParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<WriteContractReturnType>
  writeFinalizeWithdrawalTransaction: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: WriteFinalizeWithdrawalTransactionParameters<
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<WriteContractReturnType>
}

export function walletL1OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
>(
  client: WalletClient<TTransport, TChain, TAccount>,
): WalletL1OpStackActions<TChain, TAccount> {
  return {
    writeDepositTransaction: (args) => writeDepositTransaction(client, args),
    writeDepositETH: (args) => writeDepositETH(client, args),
    writeDepositERC20: (args) => writeDepositERC20(client, args),
    writeProveWithdrawalTransaction: (args) => writeProveWithdrawalTransaction(client, args),
    writeFinalizeWithdrawalTransaction: (args) => writeFinalizeWithdrawalTranasction(client, args),
  }
}
