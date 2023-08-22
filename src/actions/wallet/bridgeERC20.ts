import {
  Address,
  Chain,
  Transport,
  Account,
  WalletClient,
  SendTransactionParameters,
} from 'viem'

import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { bridgeWriteContract } from './bridgeWriteContract'

// Currently hardcoded to existing sdk value
// consider optimizing in future
const ETH_TRANSFER_L2_GAS = BigInt(200_000)

export async function bridgeERC20<
  TChainL1 extends Chain | undefined = Chain,
  TChainL2 extends OpChainL2 | undefined = OpChainL2,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(
  client: WalletClient<Transport, TChainL1>,
  {
    l1Token,
    l2Token,
    toAccount,
    value,
    toChain,
    account,
    l2Gas = ETH_TRANSFER_L2_GAS,
    ...restArgs
  }: {
    l1Token: Address
    l2Token: Address
    toChain: TChainL2
    toAccount: Address | Account
    value: bigint
    l2Gas?: bigint
  } & SendTransactionParameters<TChainL1, TAccount, TChainOverride>,
): Promise<string> {
  const to = toAccount ?? account ?? client.account?.address
  const toAddress = typeof to === 'string' ? to : to.address

  return bridgeWriteContract(
    client as any,
    {
      abi: l1StandardBridgeABI,
      toChain,
      functionName: 'depositTo',
      args: [l1Token, l2Token, toAddress, value],
      l2Gas,
      ...restArgs,
    } as any,
  )
}
