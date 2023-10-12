import type { Abi, Chain, PublicClient, Transport } from 'viem'
import { estimateFees, type EstimateFeesParameters } from '../actions/public/L2/estimateFees.js'
import { estimateL1Fee } from '../actions/public/L2/estimateL1Fee.js'
import { estimateL1GasUsed } from '../actions/public/L2/estimateL1GasUsed.js'
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
import { type OracleTransactionParameters } from '../types/gasPriceOracle.js'

export type PublicL2OpStackActions = {
  getWithdrawalMessages: (
    args: GetWithdrawalMessagesParameters,
  ) => Promise<GetWithdrawalMessagesReturnType>
  getProveWithdrawalTransactionArgs: (
    args: GetProveWithdrawalTransactionArgsParams,
  ) => Promise<GetProveWithdrawalTransactionArgsReturnType>
  /**
   * Estimate the l1 gas price portion for a transaction
   * @example
   * const price = await getL1GasPrice(publicClient, {
   *   blockNumber,
   *   blockTag,
   * });
   */
  estimateL1Fee: <TAbi extends Abi | readonly unknown[], TFunctionName extends string | undefined = undefined>(
    args: OracleTransactionParameters<TAbi, TFunctionName>,
  ) => Promise<bigint>
  estimateL1GasUsed: <TAbi extends Abi | readonly unknown[], TFunctionName extends string | undefined = undefined>(
    args: OracleTransactionParameters<TAbi, TFunctionName>,
  ) => Promise<bigint>
  estimateFees: <TAbi extends Abi | readonly unknown[], TFunctionName extends string | undefined = undefined>(
    args: EstimateFeesParameters<TAbi, TFunctionName>,
  ) => Promise<bigint>
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
    estimateL1Fee: (args) => estimateL1Fee(client, args),
    estimateL1GasUsed: (args) => estimateL1GasUsed(client, args),
    estimateFees: (args) => estimateFees(client, args),
  }
}
