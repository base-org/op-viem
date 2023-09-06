import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { GetL1ChainId, WriteActionBaseType } from '../../../types/actions'
import { DepositERC20Parameters } from '../../../types/depositERC20Parameters'
import { OpStackChain } from '../../../types/opStackChain'
import { OpStackL1Contract } from '../../../types/opStackContracts'
import { writeOpStackL1, WriteOpStackL1Parameters } from './writeOpStackL1'

export type WriteDepositERC20Parameters<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined = Chain & GetL1ChainId<TL2Chain> | undefined,
  _abi extends typeof l1StandardBridgeABI = typeof l1StandardBridgeABI,
  _contractName extends OpStackL1Contract = OpStackL1Contract.OptimismL1StandardBridge,
  _functionName extends string = 'depositERC20',
> =
  & { args: DepositERC20Parameters }
  & WriteActionBaseType<TL2Chain, TChain, TAccount, TChainOverride, _abi, _contractName, _functionName>

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
  TL2Chain extends OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined,
  _abi extends typeof l1StandardBridgeABI = typeof l1StandardBridgeABI,
  _functionName extends string = 'depositERC20',
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { l1Token, l2Token, amount, gasLimit, data },
    optimismL1StandardBridgeAddress,
    ...rest
  }: WriteDepositERC20Parameters<TL2Chain, TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: optimismL1StandardBridgeAddress,
    abi: l1StandardBridgeABI,
    contract: OpStackL1Contract.OptimismL1StandardBridge,
    functionName: 'depositERC20',
    args: [l1Token, l2Token, amount, gasLimit, data || '0x'],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TL2Chain,
    TChain,
    TAccount,
    TChainOverride,
    _abi,
    _functionName
  >)
}
