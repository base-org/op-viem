import {
  type Abi,
  type ContractFunctionName,
  encodeFunctionData,
  type EncodeFunctionDataParameters,
  type EstimateGasParameters,
  type PublicClient,
  type TransactionSerializableEIP1559,
  type Transport,
} from 'viem'
import { type Chain } from 'viem/chains'
import type { GasPriceOracleParameters, OracleTransactionParameters } from '../../../types/gasPriceOracle.js'
import { estimateL1Fee } from './estimateL1Fee.js'

export type EstimateFeesParameters<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends
    | ContractFunctionName<TAbi>
    | undefined = ContractFunctionName<TAbi>,
> =
  & OracleTransactionParameters<TAbi, TFunctionName>
  & GasPriceOracleParameters
  & Omit<EstimateGasParameters, 'data'>

export type EstimateFees = <
  TChain extends Chain | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends
    | ContractFunctionName<TAbi>
    | undefined = ContractFunctionName<TAbi>,
>(
  client: PublicClient<Transport, TChain>,
  options: EstimateFeesParameters<TAbi, TFunctionName>,
) => Promise<bigint>

/**
 * Estimates gas for an L2 transaction including the l1 fee
 * on non OP chains this is usually GasUsed * GasPrice
 * on OP chains this is GasUsed * GasPrice + L1Fee
 * @example
 * const feeValue = await estimateFees(publicClient, {
 *   abi,
 *   functionName: balanceOf,
 *   args: [address],
 * });
 */
export const estimateFees: EstimateFees = async (client, options) => {
  const encodedFunctionData = encodeFunctionData({
    abi: options.abi,
    args: options.args,
    functionName: options.functionName,
  } as EncodeFunctionDataParameters)
  const [l1Fee, l2Gas, l2GasPrice] = await Promise.all([
    estimateL1Fee(
      client,
      {
        ...options,
        // account must be undefined or else viem will return undefined
        account: undefined as any,
      } as unknown as
        & EncodeFunctionDataParameters<Abi, ContractFunctionName<Abi>>
        & Omit<TransactionSerializableEIP1559, 'data'>,
    ),
    client.estimateGas({
      to: options.to,
      account: options.account,
      accessList: options.accessList,
      blockNumber: options.blockNumber,
      blockTag: options.blockTag,
      data: encodedFunctionData,
      value: options.value,
    } as EstimateGasParameters<Chain>),
    client.getGasPrice(),
  ])
  return l1Fee + l2Gas * l2GasPrice
}
