import {
  Chain,
  Transport,
  Account,
  WalletClient,
  SendTransactionParameters,
} from 'viem'
import { writeContract } from 'viem/actions'
import { l1CrossDomainMessengerABI } from '@eth-optimism/contracts-ts'
import { OpChainL2, OpChainL1 } from '@roninjin10/rollup-chains'

export async function bridgeSendTransaction<
  TChainL1 extends OpChainL1 | undefined = OpChainL1,
  TChainL2 extends OpChainL2 | undefined = OpChainL2,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(
  client: WalletClient<Transport, OpChainL1>,
  { toChain, to, data, value, l2Gas = BigInt(200_000), ...restArgs }: { toChain: TChainL2, l2Gas?: BigInt } & SendTransactionParameters<TChainL1, TAccount, TChainOverride>,

) {
  return writeContract(client, {
    abi: l1CrossDomainMessengerABI,
    address: toChain?.opContracts.L1CrossDomainMessengerProxy,
    functionName: 'sendMessage' as any,
    args: [
      to,
      data,
      l2Gas,
    ],
    ...restArgs
    // TODO better typescriptin
  } as any)
}

