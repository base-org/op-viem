import { encodeAbiParameters, type Hex, keccak256, parseAbiParameters, pad } from 'viem'

// from https://github.com/ethereum-optimism/optimism/blob/develop/packages/sdk/src/utils/message-utils.ts#L42
// adapted to viem

/**
 * Utility for hashing a message hash. This computes the storage slot
 * where the message hash will be stored in state. 0 is used
 * because the first mapping in the contract is used.
 *
 * @param messageHash sent message hash, i.e. keccak256(abi.encode({...WithdrawalTransaction})).
 * @returns The storage slot in L2ToL1MessagePasser of the sent message
 */
export const getWithdrawalMessageStorageSlot = (messageHash: Hex): Hex => {
  const data = encodeAbiParameters(parseAbiParameters('bytes32, uint256'), [
    messageHash,
    BigInt(pad('0x0')),
  ])
  return keccak256(data)
}
