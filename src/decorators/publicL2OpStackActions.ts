import { Chain, type PublicClient, Transport } from "viem";
import {
  getProveWithdrawalTransactionArgs,
  getProveWithdrawalTransactionArgsParams,
  getProveWithdrawalTransactionArgsReturnType,
} from "../actions/public/L2/getProveWithdrawalTransactionArgs";
import {
  getWithdrawalMessages,
  GetWithdrawalMessagesParameters,
  GetWithdrawalMessagesReturnType,
} from "../actions/public/L2/getWithdrawalMessages";

export type PublicL2OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
> = {
  getWithdrawalMessages: (
    args: GetWithdrawalMessagesParameters,
  ) => Promise<GetWithdrawalMessagesReturnType>;
  getProveWithdrawalTransactionArgs: (
    args: getProveWithdrawalTransactionArgsParams,
  ) => Promise<getProveWithdrawalTransactionArgsReturnType>;
};

export function publicL2OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: PublicClient<TTransport, TChain>,
): PublicL2OpStackActions<TTransport, TChain> {
  return {
    getWithdrawalMessages: (args) => getWithdrawalMessages(client, args),
    getProveWithdrawalTransactionArgs: (args) => getProveWithdrawalTransactionArgs(client, args),
  };
}
