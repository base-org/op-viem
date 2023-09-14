import type { Account, Chain, Transport, WalletClient, WriteContractParameters, WriteContractReturnType } from 'viem'
import { writeContract } from 'viem/actions'
import type { L2WriteContractParameters } from '../../../types/l2Actions.js'
import { opStackL2ChainContracts } from '../../../types/opStackContracts.js'
import { ABI, FUNCTION, type WithdrawToParameters } from '../../../types/withdrawTo.js'

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
  return writeContract(client, {
    abi: ABI,
    functionName: FUNCTION,
    args: [l2Token, to, amount, minGasLimit, extraData],
    // TODO(Wilson): consider pulling this from chain.contracts
    // so that it will have a better error if they are not on an L2 chain
    address: opStackL2ChainContracts.l2StandardBridge.address,
    ...rest,
  } as unknown as WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    TChain,
    TAccount,
    TChainOverride
  >)
}
