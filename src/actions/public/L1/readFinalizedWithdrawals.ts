import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Chain, PublicClient, Transport } from 'viem'
import type { MessagePassedEvent } from '../../../index.js'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import { readOpStackL1, type ReadOpStackL1Parameters } from './readOpStackL1.js'

const ABI = optimismPortalABI
const CONTRACT = OpStackL1Contract.OptimismPortal
const FUNCTION_NAME = 'finalizedWithdrawals'

export type ReadFinalizedWithdrawalsParameters<
  TChain extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> = { withdrawalHash: MessagePassedEvent['withdrawalHash']; portal: RawOrContractAddress<_chainId> }

export async function readFinalizedWithdrawals<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    withdrawalHash,
    portal,
  }: ReadFinalizedWithdrawalsParameters<TChain>,
): Promise<boolean> {
  const finalizedWithdrawal = await readOpStackL1(client, {
    contract: CONTRACT,
    abi: ABI,
    functionName: FUNCTION_NAME,
    address: resolveAddress(portal),
    args: [withdrawalHash],
    chain: client.chain,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, typeof FUNCTION_NAME>)

  return finalizedWithdrawal
}
