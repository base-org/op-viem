import type { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import {
  type WithdrawToParameters,
  writeWithdrawERC20,
  type WriteWithdrawERC20Parameters,
} from './writeWithdrawERC20.js'

export const OVM_ETH = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'

type WriteWithdrawETHParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & Omit<
    WriteWithdrawERC20Parameters<TChain, TAccount, TChainOverride>,
    'args' | 'value'
  >
  & { args: Omit<WithdrawToParameters, 'l2Token'> }

export async function writeWithdrawETH<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(client: WalletClient<Transport, TChain, TAccount>, {
  args: { to, amount, minGasLimit, extraData = '0x' },
  ...rest
}: WriteWithdrawETHParameters<
  TChain,
  TAccount,
  TChainOverride
>): Promise<WriteContractReturnType> {
  return writeWithdrawERC20(client, {
    args: { l2Token: OVM_ETH, to, amount, minGasLimit, extraData },
    // NOTE: msg.value must = amount or transaction will revert
    // https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/universal/StandardBridge.sol#L306
    value: amount,
    ...rest,
  } as unknown as WriteWithdrawERC20Parameters<TChain, TAccount, TChainOverride>)
}
