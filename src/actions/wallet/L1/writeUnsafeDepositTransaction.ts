import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { Account, Address, Chain, Hex, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { GetL1ChainId, WriteActionBaseType } from '../../../types/actions'
import { OpStackChain, OpStackL1Contract } from '../../../types/opStackContracts'
import { writeOpStackL1, WriteOpStackL1Parameters } from './writeOpStackL1'

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
}

export type WriteUnsafeDepositTransactionParameters<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined = Chain & GetL1ChainId<TL2Chain> | undefined,
  _abi extends typeof optimismPortalABI = typeof optimismPortalABI,
  _functionName extends string = 'depositTransaction',
  _contractName extends OpStackL1Contract = OpStackL1Contract.OptimismPortal,
> =
  & { args: DepositTransactionParameters; value?: bigint }
  & WriteActionBaseType<TL2Chain, TChain, TAccount, TChainOverride, _abi, _contractName>

/**
 * Calls depositTransaction directly on the OptimismPortal contract.
 * Marked 'unsafe' becaused does not offer replayability incase the
 * L2 tx fails.
 *
 * @param parameters - {@link WriteUnsafeDepositTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeUnsafeDepositTransaction<
  TL2Chain extends OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, value, gasLimit, isCreation, data },
    l2Chain,
    optimismPortalAddress,
    ...rest
  }: WriteUnsafeDepositTransactionParameters<TL2Chain, TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: optimismPortalAddress,
    l2Chain,
    abi: optimismPortalABI,
    functionName: 'depositTransaction',
    contract: OpStackL1Contract.OptimismPortal,
    args: [to, value || 0n, gasLimit, isCreation || false, data || '0x'],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TL2Chain,
    TChain,
    TAccount,
    TChainOverride,
    typeof optimismPortalABI,
    'depositTransaction'
  >)
}
