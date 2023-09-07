import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { GetL1ChainId, WriteActionBaseType } from '../../../types/actions'
import { DepositERC20Parameters } from '../../../types/depositERC20Parameters'
import { OpStackChain } from '../../../types/opStackChain'
import { OpStackL1Contract } from '../../../types/opStackContracts'
import { writeOpStackL1, WriteOpStackL1Parameters } from './writeOpStackL1'

export type WriteDepositERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _abi extends typeof l1StandardBridgeABI = typeof l1StandardBridgeABI,
  _contractName extends OpStackL1Contract = OpStackL1Contract.OptimismL1StandardBridge,
  _functionName extends string = 'depositERC20',
> =
  & { args: DepositERC20Parameters }
  & WriteActionBaseType<TChain, TAccount, TChainOverride, _abi, _contractName, _functionName>

/**
 * Deposits ERC20 tokens to L2
 * @param {Address} l1Token the L1 address of the ERC20 token to deposit
 * @param {Address} l2Token the L2 address of the ERC20 token to deposit
 * @param {bigint} amount the amount of tokens to deposit
 * @param {bigint} gasLimit the gas limit for the transaction
 * @param {Hex} [data] the data to send with the transaction
 * @returns {WriteContractReturnType} the transaction hash
 */
export async function writeDepositERC20<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
  _abi extends typeof l1StandardBridgeABI = typeof l1StandardBridgeABI,
  _functionName extends string = 'depositERC20',
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { l1Token, l2Token, amount, gasLimit, data },
    optimismL1StandardBridgeAddress,
    ...rest
  }: WriteDepositERC20Parameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: optimismL1StandardBridgeAddress,
    abi: l1StandardBridgeABI,
    contract: OpStackL1Contract.OptimismL1StandardBridge,
    functionName: 'depositERC20',
    args: [l1Token, l2Token, amount, gasLimit, data || '0x'],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TChain,
    TAccount,
    TChainOverride,
    _abi,
    _functionName
  >)
}
