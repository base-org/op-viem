import { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { WriteActionBaseType } from '../../../types/actions'
import { ABI, CONTRACT, DepositETHParameters, FUNCTION } from '../../../types/depositETH'
import { writeOpStackL1, WriteOpStackL1Parameters } from './writeOpStackL1'

export type WriteDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: DepositETHParameters }
  & WriteActionBaseType<
    TChain,
    TAccount,
    TChainOverride,
    typeof ABI,
    typeof CONTRACT,
    typeof FUNCTION
  >

/**
 * Deposits ETH to L2 using the standard messenger contract
 * @param parameters - {@link WriteDepositETHParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeDepositETH<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, minGasLimit, extraData = '0x' },
    l1StandardBridgeAddress,
    ...rest
  }: WriteDepositETHParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: l1StandardBridgeAddress,
    abi: ABI,
    contract: CONTRACT,
    functionName: FUNCTION,
    args: [to, minGasLimit, extraData],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TChain,
    TAccount,
    TChainOverride,
    typeof ABI,
    typeof FUNCTION
  >)
}
