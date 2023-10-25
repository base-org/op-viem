import { gasPriceOracleABI } from '@eth-optimism/contracts-ts'
import {
  type Abi,
  type ContractFunctionName,
  type EncodeFunctionDataParameters,
  type PublicClient,
  type TransactionSerializableEIP1559,
  type Transport,
} from 'viem'
import { readContract } from 'viem/actions'
import { type Chain } from 'viem/chains'
import { opStackL2ChainContracts } from '../../../index.js'
import type { OracleTransactionParameters } from '../../../types/gasPriceOracle.js'
import { serializeEip1559Transaction } from '../../../utils/transactionSerializer.js'

export type EstimateL1GasUsedParameters<
  TAbi extends Abi,
  TFunctionName extends
    | ContractFunctionName<TAbi>
    | undefined = ContractFunctionName<TAbi>,
> = OracleTransactionParameters<TAbi, TFunctionName>

/**
 * Options for specifying the transaction being estimated
 */
export type GasPriceOracleEstimator = <
  TChain extends Chain | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends
    | ContractFunctionName<TAbi>
    | undefined = ContractFunctionName<TAbi>,
>(
  client: PublicClient<Transport, TChain>,
  options: OracleTransactionParameters<TAbi, TFunctionName>,
) => Promise<bigint>

/**
 * Returns the L1 gas used
 * @example
 * const L1GasUsedValue = await estimateL1GasUsed(data, {
 *  abi,
 *  functionName: balanceOf,
 *  args: [address],
 * });
 */
export const estimateL1GasUsed: GasPriceOracleEstimator = async (
  client,
  options,
) => {
  const data = serializeEip1559Transaction(
    options as unknown as
      & EncodeFunctionDataParameters<Abi, ContractFunctionName<Abi>>
      & Omit<TransactionSerializableEIP1559, 'data'>,
  )
  return readContract(client, {
    address: opStackL2ChainContracts.gasPriceOracle.address,
    abi: gasPriceOracleABI,
    blockNumber: options.blockNumber,
    blockTag: options.blockTag,
    functionName: 'getL1GasUsed',
    args: [data],
  })
}
