import {
  Transport,
  WalletClient,
  Chain,
  Account,
  WriteContractParameters,
  WriteContractReturnType,
  Address,
  Hex,
} from 'viem'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { writeContract } from 'viem/actions'
import { OpStackL1Chain, OpStackL2Chain } from '../../../types/opStackChain'

export type DepositTransactionParameters = {
  to: Address
  gasLimit: bigint
  value?: bigint
  isCreation?: boolean
  data?: Hex
}

export type WriteUnsafeDepositTransactionParameters<
  TChain extends OpStackL1Chain | undefined = OpStackL1Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends OpStackL1Chain | undefined = OpStackL1Chain | undefined,
  _contractName extends keyof OpStackL1Chain['contracts'] = 'optimismPortal',
  _resolvedChain extends OpStackL1Chain | undefined  = ResolveChain<TChain, TChainOverride>
> = Omit<
  WriteContractParameters<
    typeof optimismPortalABI,
    'depositTransaction',
    TChain,
    TAccount,
    TChainOverride
  >,
  'abi' | 'functionName' | 'args' | 'address'
> & ({
  toChainId: ExtractValidChainIdFromContract<_resolvedChain, _contractName>
  optimismPortal: never,
  args: DepositTransactionParameters
} | {
  toChainId: never,
  optimismPortal: Address
  args: DepositTransactionParameters
})

type ExtractValidChainIdFromContract<TChain extends OpStackL1Chain | undefined, contractName extends keyof OpStackL1Chain['contracts']> = TChain extends OpStackL1Chain ? keyof TChain['contracts'][contractName] : undefined
type ResolveChain<TChain extends Chain | undefined, TChainOverride extends Chain | undefined = undefined> = TChainOverride extends Chain ? TChainOverride : TChain

export async function writeUnsafeDepositTransaction<
  TChain extends OpStackL1Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends OpStackL1Chain | undefined,
>(
  client: WalletClient<Transport, OpStackL1Chain, TAccount>,
  {
    args: { to, value, gasLimit, isCreation, data },
    toChainId,
    optimismPortal,
    ...rest
  }: WriteUnsafeDepositTransactionParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  // if(!client.chain && !optimismPortal) {
  //   throw new Error('hi')
  // }
  const protal = optimismPortal || client.chain['contracts']['optimismPortal'][toChainId]
  return writeContract(client, {
    address: protal,
    abi: optimismPortalABI,
    functionName: 'depositTransaction' as any,
    args: [to, value || 0n, gasLimit, isCreation || false, data || '0x'],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof optimismPortalABI,
    'depositTransaction',
    OpStackL1Chain,
    TAccount,
    TChainOverride
  >)
}
