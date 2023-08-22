import {
  Address,
  Chain,
  Transport,
  Account,
  WalletClient,
  SendTransactionParameters,
} from 'viem'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { writeContract } from 'viem/actions'

export async function writeDepositETH<
  TChainL1 extends Chain | undefined = Chain,
  TChainL2 extends OpChainL2 | undefined = OpChainL2,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(
  client: WalletClient<Transport, TChainL1>,
  {
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
  const toAddress = typeof to === 'string' ? to : to.address

  return writeContract(
    client as any,
    {
      address: toChain?.opContracts.L1StandardBridgeProxy,
      abi: l1StandardBridgeABI,
      function: 'depositETHTo',
      args: [toAddress, value],
      ...restArgs,
    } as any,
  )
}
