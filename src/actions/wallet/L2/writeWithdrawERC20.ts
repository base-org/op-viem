import type { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import type { L2WriteContractParameters } from '../../../types/l2Actions.js'
import { OpStackL2Contract } from '../../../types/opStackContracts.js'
import { ABI, FUNCTION, type WithdrawToParameters } from '../../../types/withdrawTo.js'
import { writeOpStackL2, type WriteOpStackL2Parameters } from './writeOpStackL2.js'

export type WriteWithdrawERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: WithdrawToParameters }
  & L2WriteContractParameters<typeof ABI, typeof FUNCTION, TChain, TAccount, TChainOverride>

export async function writeWithdrawERC20<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(client: WalletClient<Transport, TChain, TAccount>, {
  args: { l2Token, to, amount, minGasLimit, extraData = '0x' },
  ...rest
}: WriteWithdrawERC20Parameters<
  TChain,
  TAccount,
  TChainOverride
>): Promise<WriteContractReturnType> {
  return writeOpStackL2(client, {
    abi: ABI,
    functionName: FUNCTION,
    args: [l2Token, to, amount, minGasLimit, extraData],
    contract: OpStackL2Contract.L2StandardBridge,
    ...rest,
  } as unknown as WriteOpStackL2Parameters<
    typeof ABI,
    typeof FUNCTION,
    TChain,
    TAccount,
    TChainOverride
  >)
}
