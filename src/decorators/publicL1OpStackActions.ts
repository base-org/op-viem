import type { Chain, PublicClient, Transport } from 'viem'
import {
  getL2HashesForDepositTx,
  type GetL2HashesForDepositTxParamters,
  type GetL2HashesForDepositTxReturnType,
} from '../actions/public/L1/getL2HashesForDepositTx.js'
import {
  getOutputForL2Block,
  type GetOutputForL2BlockParameters,
  type GetOutputForL2BlockReturnType,
} from '../actions/public/L1/getOutputForL2Block.js'
import {
  getSecondsToFinalizable,
  type GetSecondsToFinalizableParameters,
} from '../actions/public/L1/getSecondsToFinalizable.js'
import {
  getSecondsToNextL2Output,
  type GetSecondsToNextL2OutputParameters,
} from '../actions/public/L1/getSecondsToNextL2Output.js'
import {
  simulateDepositERC20,
  type SimulateDepositERC20Parameters,
  type SimulateDepositERC20ReturnType,
} from '../actions/public/L1/simulateDepositERC20.js'
import {
  simulateDepositETH,
  type SimulateDepositETHParameters,
  type SimulateDepositETHReturnType,
} from '../actions/public/L1/simulateDepositETH.js'
import {
  simulateProveWithdrawalTransaction,
  type SimulateProveWithdrawalTransactionParameters,
  type SimulateProveWithdrawalTransactionReturnType,
} from '../actions/public/L1/simulateProveWithdrawalTransaction.js'

export type PublicL1OpStackActions<
  TChain extends Chain | undefined = Chain | undefined,
> = {
  getL2HashesForDepositTx: (
    args: GetL2HashesForDepositTxParamters,
  ) => Promise<GetL2HashesForDepositTxReturnType>
  simulateDepositETH: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: SimulateDepositETHParameters<TChain, TChainOverride>,
  ) => Promise<SimulateDepositETHReturnType<TChain, TChainOverride>>
  simulateDepositERC20: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: SimulateDepositERC20Parameters<TChain, TChainOverride>,
  ) => Promise<SimulateDepositERC20ReturnType<TChain, TChainOverride>>
  simulateProveWithdrawTransaction: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: SimulateProveWithdrawalTransactionParameters<TChain, TChainOverride>,
  ) => Promise<SimulateProveWithdrawalTransactionReturnType<TChain, TChainOverride>>
  getOutputForL2Block: (
    args: GetOutputForL2BlockParameters<TChain>,
  ) => Promise<GetOutputForL2BlockReturnType>
  getSecondsToNextL2Output: (
    args: GetSecondsToNextL2OutputParameters<TChain>,
  ) => Promise<bigint>
  getSecondsToFinalizable: (args: GetSecondsToFinalizableParameters<TChain>) => Promise<bigint>
}

export function publicL1OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: PublicClient<TTransport, TChain>,
): PublicL1OpStackActions<TChain> {
  return {
    getL2HashesForDepositTx: (args) => getL2HashesForDepositTx(client, args),
    simulateDepositETH: (args) => simulateDepositETH(client, args),
    simulateDepositERC20: (args) => simulateDepositERC20(client, args),
    getOutputForL2Block: (args) => getOutputForL2Block(client, args),
    simulateProveWithdrawTransaction: (args) => simulateProveWithdrawalTransaction(client, args),
    getSecondsToNextL2Output: (args) => getSecondsToNextL2Output(client, args),
    getSecondsToFinalizable: (args) => getSecondsToFinalizable(client, args),
  }
}
