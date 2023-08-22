import {
  Chain,
  Transport,
  encodeFunctionData,
  WriteContractParameters,
  Account,
  Abi,
  EncodeFunctionDataParameters,
  WalletClient,
} from 'viem'
import { writeContract } from 'viem/actions'
import { l1CrossDomainMessengerABI } from '@eth-optimism/contracts-ts'
import { OpChainL2, OpChainL1 } from '@roninjin10/rollup-chains'

export async function bridgeWriteContract<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChainL2 extends OpChainL2 = OpChainL2,
  TChainL1 extends Chain & { id: TChainL2['l1']['id'] } = OpChainL1,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(
  client: WalletClient<Transport, TChainL1>,
  // TODO make this take an l2Chain that is decorated with l2 info such as the l1 contract addreses
  { toChain, args, abi, address, functionName, ...restArgs }: { toChain: TChainL2 } & WriteContractParameters<TAbi, TFunctionName, TChainL1, TAccount, TChainOverride>,
): Promise<string> {
  const minGasLimit = 200_000
  const message = encodeFunctionData({
    abi,
    functionName,
    args,
  } as unknown as EncodeFunctionDataParameters<TAbi, TFunctionName>)
  const l1TxHash = writeContract(client, {
    abi: l1CrossDomainMessengerABI,
    // TODO currently hardcoded for OP should get this from the l2 chain object
    address: toChain?.opContracts.L1CrossDomainMessengerProxy,
    functionName: 'sendMessage' as any,
    args: [
      address,
      message,
      minGasLimit,
    ],
    ...restArgs
    // TODO better types
  } as any)
  // compose with getL2Hash method to get l2 hash I think is what we want here
  // We could consider baking that into this method
  return l1TxHash
}

