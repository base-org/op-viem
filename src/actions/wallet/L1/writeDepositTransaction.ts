import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import type {
  Account,
  Address,
  Chain,
  ContractFunctionArgs,
  Hex,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'

export const ABI = optimismPortalABI
export const FUNCTION = 'depositTransaction'

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
  mint?: bigint
}

export type WriteDepositTransactionParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> // _chainId = TChain extends Chain ? TChain['id'] : number,
 =
  & { args: DepositTransactionParameters; portal: RawOrContractAddress<number> }
  & L1WriteActionBaseType<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
    TChain,
    TAccount,
    TChainOverride
  >

/**
 * Calls depositTransaction on the OptimismPortal contract.
 *
 * Unlike writeSendMessage, does not offer replayability on L2 incase the L2 tx fails.
 * But has the advantage that, if the caller is an EOA, msg.sender of the L2 tx
 * will be the caller address. Allowing users to fully tranasact on L2 from L1, which
 * is a critical security property.
 *
 * If the caller is not an EOA, e.g. if the caller is a smart contract wallet,
 * msg.sender on L2 will be alias of the caller address
 * https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L407
 *
 * @param parameters - {@link WriteDepositTransactionParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeDepositTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, value = 0n, gasLimit, isCreation = false, data = '0x', mint = 0n },
    portal,
    ...rest
  }: WriteDepositTransactionParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: resolveAddress(portal),
    abi: ABI,
    functionName: FUNCTION,
    args: [to, value, gasLimit, isCreation, data],
    value: mint,
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
