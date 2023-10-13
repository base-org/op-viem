import type { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { type DepositETHParameters } from '../../../types/depositETH.js'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'
import { writeDepositTransaction, type WriteDepositTransactionParameters } from './writeDepositTransaction.js'

export type WriteDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: DepositETHParameters; optimismPortal: RawOrContractAddress<_chainId> }
  & L1WriteActionBaseType<
    TChain,
    TAccount,
    TChainOverride
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
    args: { to, gasLimit, data },
    optimismPortal,
    value,
    ...rest
  }: WriteDepositETHParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeDepositTransaction(client, {
    args: { to, value, gasLimit: BigInt(gasLimit), data },
    optimismPortal: resolveAddress(optimismPortal),
    value,
    ...rest,
  } as unknown as WriteDepositTransactionParameters<
    TChain,
    TAccount,
    TChainOverride
  >)
}
