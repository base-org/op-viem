import { gasPriceOracleABI, gasPriceOracleAddress } from '@eth-optimism/contracts-ts'
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
import type { OracleTransactionParameters } from '../../../types/gasPriceOracle.js'
import { serializeEip1559Transaction } from '../../../utils/transactionSerializer.js'

export type EstimateL1FeeParameters<
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
 * Computes the L1 portion of the fee based on the size of the rlp encoded input
 * transaction, the current L1 base fee, and the various dynamic parameters.
 * @example
 * const L1FeeValue = await estimateL1Fee(publicClient, {
 *   abi,
 *   functionName: balanceOf,
 *   args: [address],
 * });
 */
export const estimateL1Fee: GasPriceOracleEstimator = async (
  client,
  options,
) => {
  const data = serializeEip1559Transaction(
    options as unknown as
      & EncodeFunctionDataParameters<Abi, ContractFunctionName<Abi>>
      & Omit<TransactionSerializableEIP1559, 'data'>,
  )
  return readContract(client, {
    address: gasPriceOracleAddress['420'],
    abi: gasPriceOracleABI,
    blockNumber: options.blockNumber,
    blockTag: options.blockTag,
    args: [data],
    functionName: 'getL1Fee',
  })
}
