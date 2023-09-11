import type { Chain, PublicClient, Transport } from 'viem'
import {
  getProveWithdrawalTransactionArgs,
  type GetProveWithdrawalTransactionArgsParams,
  type GetProveWithdrawalTransactionArgsReturnType,
} from '../actions/public/L2/getProveWithdrawalTransactionArgs.js'
import {
  getWithdrawalMessages,
  type GetWithdrawalMessagesParameters,
  type GetWithdrawalMessagesReturnType,
} from '../actions/public/L2/getWithdrawalMessages.js'

export type PublicL2OpStackActions = {
  getWithdrawalMessages: (
    args: GetWithdrawalMessagesParameters,
  ) => Promise<GetWithdrawalMessagesReturnType>
  getProveWithdrawalTransactionArgs: (
    args: GetProveWithdrawalTransactionArgsParams,
  ) => Promise<GetProveWithdrawalTransactionArgsReturnType>
}

export function publicL2OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: PublicClient<TTransport, TChain>,
): PublicL2OpStackActions {
  return {
    getWithdrawalMessages: (args) => getWithdrawalMessages(client, args),
    getProveWithdrawalTransactionArgs: (args) => getProveWithdrawalTransactionArgs(client, args),
  }
}
