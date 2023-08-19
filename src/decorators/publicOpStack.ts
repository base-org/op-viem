import { Account, Chain, Client, type PublicClient, Transport } from 'viem'
import {
  GetL2HashesForDepositTxParamters,
  GetL2HashesForDepositTxReturnType,
  getL2HashesForDepositTx,
} from '../actions/getL2HashesForDepositTx'

/// NOTE We don't currently need account for exisiting actions but keeping in case
export type PublicOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
> = {
  getL2HashesForDepositTx: (
    args: GetL2HashesForDepositTxParamters,
  ) => Promise<GetL2HashesForDepositTxReturnType>
}

export function publicOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: PublicClient<TTransport, TChain>,
): PublicOpStackActions<TTransport, TChain> {
  return {
    getL2HashesForDepositTx: (args) => getL2HashesForDepositTx(client, args),
  }
}
