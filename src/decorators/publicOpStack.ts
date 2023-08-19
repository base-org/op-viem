import { Account, Chain, Client, type PublicClient, Transport } from 'viem'
import {
  GetL2HashForDepositTxParamters,
  GetL2HashForDepositTxReturnType,
  getL2HashForDepositTx,
} from '../actions/getL2HashForDepositTx'

/// NOTE We don't currently need account for exisiting actions but keeping in case
export type PublicOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
> = {
  getL2HashForDepositTx: (
    args: GetL2HashForDepositTxParamters,
  ) => Promise<GetL2HashForDepositTxReturnType>
}

export function publicOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: PublicClient<TTransport, TChain>,
): PublicOpStackActions<TTransport, TChain> {
  return {
    getL2HashForDepositTx: (args) => getL2HashForDepositTx(client, args),
  }
}
