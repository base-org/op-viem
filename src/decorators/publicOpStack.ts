import { Chain, type PublicClient, Transport } from 'viem'
import {
  GetL2HashesForDepositTxParamters,
  GetL2HashesForDepositTxReturnType,
  getL2HashesForDepositTx,
} from '../actions/public/getL2HashesForDepositTx'
import {
  GetWithdrawalMessagesParameters,
  GetWithdrawalMessagesReturnType,
  getWithdrawalMessages,
} from '../actions/public/getWithdrawalMessages'
import {
  simulateDepositETH,
  SimulateDepositETHParameters,
  SimulateDepositETHReturnType,
} from '../actions/public/simulateDepositETH'
import {
  simulateDepositERC20,
  SimulateDepositERC20Parameters,
  SimulateDepositERC20ReturnType,
} from '../actions/public/simulateDepositERC20'

/// NOTE We don't currently need account for exisiting actions but keeping in case
export type PublicOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
> = {
  getL2HashesForDepositTx: (
    args: GetL2HashesForDepositTxParamters,
  ) => Promise<GetL2HashesForDepositTxReturnType>
  getWithdrawalMessages: (
    args: GetWithdrawalMessagesParameters,
  ) => Promise<GetWithdrawalMessagesReturnType>
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
}

export function publicOpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: PublicClient<TTransport, TChain>,
): PublicOpStackActions<TTransport, TChain> {
  return {
    getL2HashesForDepositTx: (args) => getL2HashesForDepositTx(client, args),
    getWithdrawalMessages: (args) => getWithdrawalMessages(client, args),
    simulateDepositETH: (args) => simulateDepositETH(client, args),
    simulateDepositERC20: (args) => simulateDepositERC20(client, args),
  }
}
