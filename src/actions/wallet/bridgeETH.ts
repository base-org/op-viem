import {
  Address,
  Chain,
  Transport,
  Account,
  WalletClient,
  SendTransactionParameters,
} from 'viem'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { bridgeSendTransaction } from './bridgeSendTransaction'

// Currently hardcoded to existing sdk value
// consider optimizing in future
const ETH_TRANSFER_L2_GAS = BigInt(200_000)

export async function bridgeETH<
  TChainL1 extends Chain | undefined = Chain,
  TChainL2 extends OpChainL2 | undefined = OpChainL2,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(
  client: WalletClient<Transport, TChainL1>,
  {
    data,
    value,
    toChain,
    account,
    toAccount,
    ...restArgs
  }: {
    toChain: TChainL2
    toAccount: Address | Account
    value: bigint
  } & SendTransactionParameters<TChainL1, TAccount, TChainOverride>,
): Promise<string> {
  const to = toAccount ?? account ?? client.account?.address
  // TODO better typescriptin
  return bridgeSendTransaction(
    client as any,
    {
      ...restArgs,
      value,
      toChain,
      to: typeof to === 'string' ? to : to.address,
      data: data ?? '0x0',
      l2Gas: ETH_TRANSFER_L2_GAS,
    } as any,
  )
}
