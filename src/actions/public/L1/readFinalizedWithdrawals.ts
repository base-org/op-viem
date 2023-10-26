import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Chain, PublicClient, ReadContractParameters, Transport } from 'viem'
import { readContract } from 'viem/actions'
import type { MessagePassedEvent } from '../../../index.js'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'

const ABI = optimismPortalABI
const FUNCTION_NAME = 'finalizedWithdrawals'

export type ReadFinalizedWithdrawalsParameters<
  TChain extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> = { withdrawalHash: MessagePassedEvent['withdrawalHash']; portal: RawOrContractAddress<_chainId> }

/**
 * Reads whether a withdrawal has been finalized from the Optimism Portal.
 *
 * @param {Hash} withdrawalHash the hash of the withdrawal
 * @param {RawOrContractAddress} portal the address of the portal
 *
 * @returns {Promise<boolean>} whether the withdrawal is finalized
 */
export async function readFinalizedWithdrawals<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    withdrawalHash,
    portal,
  }: ReadFinalizedWithdrawalsParameters<TChain>,
): Promise<boolean> {
  const finalizedWithdrawal = await readContract(client, {
    abi: ABI,
    functionName: FUNCTION_NAME,
    address: resolveAddress(portal),
    args: [withdrawalHash],
    chain: client.chain,
  } as ReadContractParameters<typeof ABI, typeof FUNCTION_NAME>)

  return finalizedWithdrawal
}
