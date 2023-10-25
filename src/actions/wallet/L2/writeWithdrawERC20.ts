import type {
  Account,
  Chain,
  ContractFunctionArgs,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'
import type { L2WriteContractParameters } from '../../../types/l2Actions.js'
import { opStackL2ChainContracts, OpStackL2Contract } from '../../../types/opStackContracts.js'
import { ABI, FUNCTION, type WithdrawToParameters } from '../../../types/withdrawTo.js'

export type WriteWithdrawERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: WithdrawToParameters }
  & L2WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
    TChain,
    TAccount,
    TChainOverride
  >

/**
 * Withdraws ERC20 tokens to an L1 address.
 *
 * @param {Address} l2Token the address of the ERC20 token on L2
 * @param {Address} to the address to withdraw to on L1
 * @param {Bigint} amount the amount of tokens to withdraw
 * @param {Bigint} minGasLimit the minimum gas limit for the withdrawal
 * @param {Hex} [extraData] the extra data for the withdrawal
 *
 * @returns {Promise<Hash>} the hash of the transaction
 */
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
    address: opStackL2ChainContracts[OpStackL2Contract.L2StandardBridge].address,
    ...rest,
  } as unknown as WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<
      typeof ABI,
      'payable',
      typeof FUNCTION
    >,
    TChain,
    TAccount,
    TChainOverride
  >)
}
