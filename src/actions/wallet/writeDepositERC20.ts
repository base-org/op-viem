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
import { writeContract } from 'viem/actions'

export async function writeDepositERC20<
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
    amount,
    toChain,
    account,
    ...restArgs
  }: {
    l1Token: Address
    l2Token: Address
    toChain: TChainL2
    toAccount: Address | Account
    amount: bigint
  } & SendTransactionParameters<TChainL1, TAccount, TChainOverride>,
): Promise<string> {
  const to = toAccount ?? account ?? client.account?.address
  const toAddress = typeof to === 'string' ? to : to.address

  return writeContract(
    client as any,
    {
      address: toChain?.opContracts.L1StandardBridgeProxy,
      abi: l1StandardBridgeABI,
      function: 'depositERC20To',
      args: [l1Token, l2Token, toAddress, amount],
      ...restArgs,
    } as any,
  )
}
