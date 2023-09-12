import { gasPriceOracleABI, gasPriceOracleAddress } from '@eth-optimism/contracts-ts'
import {
  type Abi,
  type BlockTag,
  type EncodeFunctionDataParameters,
  type PublicClient,
  type TransactionSerializableEIP1559,
  type Transport,
} from 'viem'
import { readContract } from 'viem/actions'
import { type Chain } from 'viem/chains'
import { serializeEip1559Transaction } from '../../../utils/transactionSerializer.js'

/**
 * Options to query a specific block
 */
type BlockOptions = {
  /**
   * Block number to query from
   */
  blockNumber?: bigint
  /**
   * Block tag to query from
   */
  blockTag?: BlockTag
}

/**
 * Options for all GasPriceOracle methods
 */
export type GasPriceOracleParameters = BlockOptions

/**
 * Options for specifying the transaction being estimated
 */
export type OracleTransactionParameters<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string | undefined = undefined,
> =
  & EncodeFunctionDataParameters<TAbi, TFunctionName>
  & Omit<TransactionSerializableEIP1559, 'data' | 'type'>
  & GasPriceOracleParameters
/**
 * Options for specifying the transaction being estimated
 */
export type GasPriceOracleEstimator = <
  TChain extends Chain | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string | undefined = undefined,
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
export const estimateL1GasUsed: GasPriceOracleEstimator = async (client, options) => {
  const data = serializeEip1559Transaction(options)
  return readContract(client, {
    address: gasPriceOracleAddress['420'],
    abi: gasPriceOracleABI,
    blockNumber: options.blockNumber,
    blockTag: options.blockTag,
    functionName: 'getL1GasUsed',
    args: [data],
  })
}
