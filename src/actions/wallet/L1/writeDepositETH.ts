import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type { Account, Chain, ContractFunctionArgs, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { type DepositETHParameters } from '../../../types/depositETH.js'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'
import { writeDepositTransaction, type WriteDepositTransactionParameters } from './writeDepositTransaction.js'

export const ABI = optimismPortalABI
export const FUNCTION = 'depositTransaction'

export type WriteDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: DepositETHParameters; portal: RawOrContractAddress<_chainId> }
  & Omit<
    L1WriteActionBaseType<
      typeof ABI,
      typeof FUNCTION,
      ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
      TChain,
      TAccount,
      TChainOverride
    >,
    'value'
  >

/**
 * Deposits ETH to L2 using the OptimismPortal contract
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
    args: { to, gasLimit, data, amount },
    portal,
    ...rest
  }: WriteDepositETHParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeDepositTransaction(client, {
    args: { to, value: amount, gasLimit: BigInt(gasLimit), data },
    portal: resolveAddress(portal),
    value: amount,
    ...rest,
  } as unknown as WriteDepositTransactionParameters<
    TChain,
    TAccount,
    TChainOverride
  >)
}
