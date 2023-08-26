import { Hex, encodeAbiParameters, keccak256, parseAbiParameters } from 'viem'

// from https://github.com/ethereum-optimism/optimism/blob/develop/packages/sdk/src/utils/message-utils.ts#L42
// adapted to viem

/**
 * Utility for hashing a message hash. This computes the storage slot
 * where the message hash will be stored in state. HashZero is used
 * because the first mapping in the contract is used.
 *
 * @param messageHash Message hash to hash.
 * @returns Hash of the given message hash.
 */
export const hashMessageHash = (messageHash: Hex): string => {
  const data = encodeAbiParameters(parseAbiParameters(['bytes32, uint256']), [
    messageHash,
    0n,
  ])
  return keccak256(data)
}
