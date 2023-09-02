import {
  WriteDepositERC20Parameters,
  writeDepositERC20,
} from '../actions/wallet/L1/writeDepositERC20'
import {
  WriteDepositETHParameters,
  writeDepositETH,
} from '../actions/wallet/L1/writeDepositETH'
import {
  WriteUnsafeDepositTransactionParameters,
  writeUnsafeDepositTransaction,
} from '../actions/wallet/L1/writeUnsafeDepositTransaction'
import { Account, Chain, Transport, WriteContractReturnType } from 'viem'
import { WalletClient } from 'viem'

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

export function walletL1OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
>(
  client: WalletClient<TTransport, TChain, TAccount>,
): WalletL1OpStackActions<TChain, TAccount> {
  return {
    writeUnsafeDepositTransaction: (args) =>
      writeUnsafeDepositTransaction(client, args),
    writeDepositETH: (args) => writeDepositETH(client, args),
    writeDepositERC20: (args) => writeDepositERC20(client, args),
  }
}
