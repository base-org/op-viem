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
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { bridgeSendTransaction } from './bridgeSendTransaction'

export async function bridgeWriteContract<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChainL2 extends OpChainL2 = OpChainL2,
  TChainL1 extends Chain = TChainL2['l1'],
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(
  client: WalletClient<Transport, TChainL2['l1']>,
  // TODO Document wtf l2Gas is and maybe give it a better name
  {
    toChain,
    args,
    abi,
    address,
    functionName,
    l2Gas = BigInt(200_000),
    ...restArgs
  }: { toChain: TChainL2; l2Gas?: BigInt } & WriteContractParameters<
    TAbi,
    TFunctionName,
    TChainL1,
    TAccount,
    TChainOverride
  >,
): Promise<string> {
  const message = encodeFunctionData({
    abi,
    functionName,
    args,
  } as unknown as EncodeFunctionDataParameters<TAbi, TFunctionName>)
  // TODO better typescriptin
  return bridgeSendTransaction(
    client as any,
    {
      ...restArgs,
      toChain,
      to: address,
      data: message,
      l2Gas,
      // TODO better typescriptin
    } as any,
  )
}
