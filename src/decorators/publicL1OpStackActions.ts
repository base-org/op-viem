import { Chain, type PublicClient, Transport } from 'viem'
import {
  getL2HashesForDepositTx,
  GetL2HashesForDepositTxParamters,
  GetL2HashesForDepositTxReturnType,
} from '../actions/public/L1/getL2HashesForDepositTx.js'
import {
  getOutputForL2Block,
  GetOutputForL2BlockParameters,
  GetOutputForL2BlockReturnType,
} from '../actions/public/L1/getOutputForL2Block.js'
import {
  simulateDepositERC20,
  SimulateDepositERC20Parameters,
  SimulateDepositERC20ReturnType,
} from '../actions/public/L1/simulateDepositERC20.js'
import {
  simulateDepositETH,
  SimulateDepositETHParameters,
  SimulateDepositETHReturnType,
} from '../actions/public/L1/simulateDepositETH.js'

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
  getOutputForL2Block: (
    args: GetOutputForL2BlockParameters<TChain>,
  ) => Promise<GetOutputForL2BlockReturnType>
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
  }
}
