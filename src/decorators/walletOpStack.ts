import { Abi, Account, Chain, Transport, WriteContractReturnType } from 'viem'
import { WalletClient } from 'wagmi'
import { bridgeWriteContract } from '../actions/wallet/bridgeWriteContract'
import {
  WriteUnsafeDepositTransactionParameters,
  writeUnsafeDepositTransaction,
} from '../actions/wallet/writeUnsafeDepositTransaction'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { OpChainL2 } from '@roninjin10/rollup-chains'

/// NOTE We don't currently need account for exisiting actions but keeping in case
// TODO need to add generics
export type WalletOpStackActions<
  TToChain extends OpChainL2,
  TChain extends Chain & { id: TToChain['l1']['id'] },
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
      TToChain,
      TChain,
      TAccount,
      TChainOverride
    >,
  ) => Promise<WriteContractReturnType>
}

export function walletOpStackActions<
  TTransport extends Transport = Transport,
  TToChain extends OpChainL2 = OpChainL2,
  TChain extends Chain & { id: TToChain['l1']['id'] } = TToChain["l1"],
  TAccount extends Account = Account,
>(
  client: WalletClient<TTransport, TChain, TAccount>,
): WalletOpStackActions<TToChain, TChain, TAccount> {
  return {
    // TODO do better than as any
    bridgeWriteContract: (args) => bridgeWriteContract(client as any, args),
    writeUnsafeDepositTransaction: (args) =>
      writeUnsafeDepositTransaction(client, args),
  }
}
