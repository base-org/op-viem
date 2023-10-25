import type {
  Abi,
  BlockTag,
  ContractFunctionName,
  EncodeFunctionDataParameters,
  PublicClient,
  TransactionSerializableEIP1559,
  Transport,
} from 'viem'
import type { Chain } from 'viem/chains'

/**
 * Options to query a specific block
 */
export type BlockOptions = {
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
  TFunctionName extends
    | ContractFunctionName<TAbi>
    | undefined = ContractFunctionName<TAbi>,
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
  TFunctionName extends
    | ContractFunctionName<TAbi>
    | undefined = ContractFunctionName<TAbi>,
>(
  client: PublicClient<Transport, TChain>,
  options: OracleTransactionParameters<TAbi, TFunctionName>,
) => Promise<bigint>
