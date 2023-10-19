import {
  type Abi,
  encodeFunctionData,
  type EncodeFunctionDataParameters,
  serializeTransaction,
  type TransactionSerializableEIP1559,
  type TransactionSerializedEIP1559,
} from 'viem'

/**
 * Serializes a transaction with EIP-1559
 */
export function serializeEip1559Transaction<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string | undefined = undefined,
>(
  options:
    & EncodeFunctionDataParameters<TAbi, TFunctionName>
    & Omit<TransactionSerializableEIP1559, 'data'>,
): TransactionSerializedEIP1559 {
  const encodedFunctionData = encodeFunctionData(options)
  const serializedTransaction = serializeTransaction({
    ...options,
    data: encodedFunctionData,
    type: 'eip1559',
  })
  return serializedTransaction as TransactionSerializedEIP1559
}
