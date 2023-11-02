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
import {
  simulateWithdrawERC20,
  type SimulateWithdrawERC20Parameters,
  type SimulateWithdrawERC20ReturnType,
} from '../actions/public/L2/simulateWithdrawERC20.js'
import {
  simulateWithdrawETH,
  type SimulateWithdrawETHParameters,
  type SimulateWithdrawETHReturnType,
} from '../actions/public/L2/simulateWithdrawETH.js'

import { type OracleTransactionParameters } from '../types/gasPriceOracle.js'

export type PublicL2OpStackActions<TChain extends Chain | undefined = Chain | undefined> = {
  /**
   * Estimate the l1 gas price portion for a transaction
   * @example
   * const price = await getL1GasPrice(publicClient, {
   *   blockNumber,
   *   blockTag,
   * });
   */
  estimateFees: <TAbi extends Abi | readonly unknown[], TFunctionName extends string | undefined = undefined>(
    args: EstimateFeesParameters<TAbi, TFunctionName>,
  ) => Promise<bigint>
  estimateL1Fee: <TAbi extends Abi | readonly unknown[], TFunctionName extends string | undefined = undefined>(
    args: OracleTransactionParameters<TAbi, TFunctionName>,
  ) => Promise<bigint>
  estimateL1GasUsed: <TAbi extends Abi | readonly unknown[], TFunctionName extends string | undefined = undefined>(
    args: OracleTransactionParameters<TAbi, TFunctionName>,
  ) => Promise<bigint>

  getProveWithdrawalTransactionArgs: (
    args: GetProveWithdrawalTransactionArgsParams,
  ) => Promise<GetProveWithdrawalTransactionArgsReturnType>
  getWithdrawalMessages: (
    args: GetWithdrawalMessagesParameters,
  ) => Promise<GetWithdrawalMessagesReturnType>

  simulateWithdrawERC20: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    args: SimulateWithdrawERC20Parameters<TChain, TChainOverride>,
  ) => Promise<
    SimulateWithdrawERC20ReturnType<
      TChain,
      TChainOverride
    >
  >

  simulateWithdrawETH: <
    TChainOverride extends Chain | undefined = undefined,
  >(
    args: SimulateWithdrawETHParameters<TChain, TChainOverride>,
  ) => Promise<
    SimulateWithdrawETHReturnType<
      TChain,
      TChainOverride
    >
  >
}

export function publicL2OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: PublicClient<TTransport, TChain>,
): PublicL2OpStackActions<TChain> {
  return {
    estimateFees: (args) => estimateFees(client, args),
    estimateL1Fee: (args) => estimateL1Fee(client, args),
    estimateL1GasUsed: (args) => estimateL1GasUsed(client, args),

    getProveWithdrawalTransactionArgs: (args) => getProveWithdrawalTransactionArgs(client, args),
    getWithdrawalMessages: (args) => getWithdrawalMessages(client, args),

    simulateWithdrawERC20: (args) => simulateWithdrawERC20(client, args),
    simulateWithdrawETH: (args) => simulateWithdrawETH(client, args),
  }
}
