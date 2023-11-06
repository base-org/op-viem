import {
  type Abi,
  type ContractFunctionName,
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
  TFunctionName extends
    | ContractFunctionName<TAbi>
    | undefined = ContractFunctionName<TAbi>,
>(
  options:
    & EncodeFunctionDataParameters<TAbi, TFunctionName>
    & Omit<TransactionSerializableEIP1559, 'data'>,
): TransactionSerializedEIP1559 {
  const encodedFunctionData = encodeFunctionData(
    options as unknown as EncodeFunctionDataParameters<Abi, ContractFunctionName<Abi>>,
  )
  const serializedTransaction = serializeTransaction({
    ...options,
    data: encodedFunctionData,
    type: 'eip1559',
  })
  return serializedTransaction as TransactionSerializedEIP1559
}
