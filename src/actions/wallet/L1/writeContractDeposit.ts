import {
  type Abi,
  type Account,
  type Address,
  type Chain,
  type ContractFunctionArgs,
  type ContractFunctionName,
  encodeFunctionData,
  type EncodeFunctionDataParameters,
  type Transport,
  type WalletClient,
  type WriteContractParameters,
  type WriteContractReturnType,
} from 'viem'
import { getBytecode } from 'viem/actions'
import { parseAccount } from 'viem/utils'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { writeDepositTransaction, type WriteDepositTransactionParameters } from './writeDepositTransaction.js'

export type WriteContractDepositParameters<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ContractFunctionName<
    TAbi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<TAbi, 'nonpayable' | 'payable'>,
  TArgs extends ContractFunctionArgs<
    TAbi,
    'nonpayable' | 'payable',
    TFunctionName
  > = ContractFunctionArgs<TAbi, 'nonpayable' | 'payable', TFunctionName>,
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & {
    account: TAccount | Address
    l2GasLimit: bigint
    l2MsgValue?: bigint
    strict?: boolean
    portal: RawOrContractAddress<_chainId>
  }
  & Omit<
    WriteContractParameters<
      TAbi,
      TFunctionName,
      TArgs,
      TChain,
      TAccount,
      TChainOverride
    >, // NOTE(Wilson):
    // In the future we could possibly allow value to be passed, creating an L2 mint
    // as writeDepositTransaction does but I want to avoid for now as it complicates
    // simulating the L2 transaction that results from this call, as we have no to mock/simulate the L2 mint.
    'value' | 'account'
  >

/**
 * A L1 -> L2 version of Viem's writeContract. Can be used to create an arbitrary L2 transaction from L1.
 * NOTE: If caller is a smart contract wallet, msg.sender on the L2 transaction will be an alias of the L1 address.
 * Must set `strict` = false to allow calling from smart contract wallet.
 *
 * @param parameters - {@link WriteContractDepositParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeContractDeposit<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  const TAbi extends Abi | readonly unknown[],
  TFunctionName extends ContractFunctionName<
    TAbi,
    'nonpayable' | 'payable'
  >,
  TArgs extends ContractFunctionArgs<
    TAbi,
    'nonpayable' | 'payable',
    TFunctionName
  >,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    abi,
    account: account_ = client.account,
    address,
    args,
    functionName,
    l2GasLimit,
    l2MsgValue = 0n,
    portal,
    strict = true,
    ...request
  }: WriteContractDepositParameters<
    TAbi,
    TFunctionName,
    TArgs,
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  const calldata = encodeFunctionData({
    abi,
    args,
    functionName,
  } as unknown as EncodeFunctionDataParameters<Abi, ContractFunctionName<Abi>>)
  if (!account_) {
    throw new Error('No account found')
  }
  const account = parseAccount(account_)

  if (strict) {
    const code = await getBytecode(client, { address: account.address })
    if (code) {
      throw new Error(
        'Calling depositTransaction from a smart contract can have unexpected results, see https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#address-aliasing. Set `strict` to false to disable this check.',
      )
    }
  }
  return writeDepositTransaction(client, {
    portal: resolveAddress(portal),
    args: { gasLimit: l2GasLimit, to: address, data: calldata, value: l2MsgValue },
    account,
    ...request,
  } as unknown as WriteDepositTransactionParameters<TChain, TAccount, TChainOverride>)
}
