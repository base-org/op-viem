import type { Account, Chain, Transport, WriteContractReturnType } from 'viem'
import type { WalletClient } from 'viem'
import { writeWithdrawERC20, type WriteWithdrawERC20Parameters } from '../actions/wallet/L2/writeWithdrawERC20.js'
import { writeWithdrawETH, type WriteWithdrawETHParameters } from '../actions/wallet/L2/writeWithdrawETH.js'

export type WalletL2OpStackActions<
  // TODO(Wilson): Consider making this OpStackChain
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
> = {
  writeWithdrawETH: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: WriteWithdrawETHParameters<TChain, TAccount, TChainOverride>,
  ) => Promise<WriteContractReturnType>
  writeWithdrawERC20: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: WriteWithdrawERC20Parameters<TChain, TAccount, TChainOverride>,
  ) => Promise<WriteContractReturnType>
}

export function walletL2OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
>(
  client: WalletClient<TTransport, TChain, TAccount>,
): WalletL2OpStackActions<TChain, TAccount> {
  return {
    writeWithdrawETH: (args) => writeWithdrawETH(client, args),
    writeWithdrawERC20: (args) => writeWithdrawERC20(client, args),
  }
}
