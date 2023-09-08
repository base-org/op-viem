import { l2CrossDomainMessengerABI } from '@eth-optimism/contracts-ts'
import { Address, Chain, EstimateContractGasParameters, Hex, PublicClient, Transport } from 'viem'
import { estimateContractGas } from 'viem/actions'
import { opStackL2ChainContracts } from '../../../types/opStackContracts'

const ABI = l2CrossDomainMessengerABI
const FUNCTION = 'relayMessage'
export const ESTIMATION_ADDRESS = '0x0000000000000000000000000000000000000001'

export type RelayMessageParams = {
  nonce: bigint
  sender: Address
  target: Address
  value: bigint
  minGasLimit: bigint
  message: Hex
}

type EstimateRelayGasParameters<TChain extends Chain | undefined = Chain | undefined> =
  & { args: RelayMessageParams }
  & { crossDomainMessengerAddress?: Address }
  & Omit<
    EstimateContractGasParameters<typeof ABI, typeof FUNCTION, TChain>,
    'args' | 'address' | 'functionName' | 'account' | 'abi'
  >

export async function estimateRelayMessageGas<
  TChain extends Chain | undefined,
>(
  client: PublicClient<Transport, TChain>,
  { args, crossDomainMessengerAddress = opStackL2ChainContracts.optimismL2CrossDomainMessenger.address, ...rest }:
    EstimateRelayGasParameters<TChain>,
) {
  return estimateContractGas(client, {
    address: crossDomainMessengerAddress,
    abi: ABI,
    functionName: FUNCTION,
    args: [args.nonce, args.sender, args.target, args.value, args.minGasLimit, args.message],
    account: ESTIMATION_ADDRESS,
    ...rest,
  } as unknown as EstimateContractGasParameters<typeof ABI, typeof FUNCTION, TChain>)
}
