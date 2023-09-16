import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Chain, Hex, PublicClient, Transport } from 'viem'
import type { MessagePassedEvent } from '../../../index.js'
import type { GetL2Chain, L1ActionBaseType } from '../../../types/l1Actions.js'
import { OpStackL1Contract } from '../../../types/opStackContracts.js'
import { readOpStackL1, type ReadOpStackL1Parameters } from './readOpStackL1.js'

const ABI = optimismPortalABI
const CONTRACT = OpStackL1Contract.OptimismPortal
const FUNCTION_NAME = 'provenWithdrawals'

export type ReadProvenWithdrawalsParameters<
  TChain extends Chain | undefined = Chain,
> =
  & { withdrawalHash: MessagePassedEvent['withdrawalHash'] }
  & L1ActionBaseType<
    GetL2Chain<TChain>,
    typeof CONTRACT
  >

export type ProvenWithdrawal = {
  outputRoot: Hex
  timestamp: bigint
  l2OutputIndex: bigint
}

export type ReadProvenWithdrawalsReturnType = ProvenWithdrawal

// Convention: use `read` if this is just 1:1 with some contract function
export async function readProvenWithdrawals<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    withdrawalHash,
    optimismPortalAddress,
    l2Chain,
  }: ReadProvenWithdrawalsParameters<TChain>,
): Promise<ReadProvenWithdrawalsReturnType> {
  const values = await readOpStackL1(client, {
    contract: CONTRACT,
    abi: ABI,
    functionName: FUNCTION_NAME,
    l2Chain,
    address: optimismPortalAddress,
    args: [withdrawalHash],
    chain: client.chain,
  } as ReadOpStackL1Parameters<TChain, typeof ABI, typeof FUNCTION_NAME>)

  const provenWithdrawal = {
    outputRoot: values[0],
    timestamp: values[1],
    l2OutputIndex: values[2],
  }

  if (provenWithdrawal.timestamp === 0n) {
    throw new Error(`Withdrawal with hash ${withdrawalHash} is not proven`)
  }

  return provenWithdrawal
}
