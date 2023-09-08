import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { WriteActionBaseType } from '../../../types/actions'
import { DepositERC20Parameters } from '../../../types/depositERC20Parameters'
import { OpStackL1Contract } from '../../../types/opStackContracts'
import { writeOpStackL1, WriteOpStackL1Parameters } from './writeOpStackL1'

const ABI = l1StandardBridgeABI
const CONTRACT = OpStackL1Contract.OptimismL1StandardBridge
const FUNCTION = 'depositERC20'

export type WriteDepositERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: DepositERC20Parameters }
  & WriteActionBaseType<
    TChain,
    TAccount,
    TChainOverride,
    typeof ABI,
    typeof CONTRACT,
    typeof FUNCTION
  >

/**
 * Deposits ERC20 tokens to L2 using the standard bridge
 * @param parameters - {@link WriteDepositERC20Parameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeDepositERC20<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { l1Token, l2Token, amount, minGasLimit, extraData = '0x' },
    optimismL1StandardBridgeAddress,
    ...rest
  }: WriteDepositERC20Parameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: optimismL1StandardBridgeAddress,
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [l1Token, l2Token, amount, minGasLimit, extraData],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TChain,
    TAccount,
    TChainOverride,
    typeof ABI,
    typeof FUNCTION
  >)
}
