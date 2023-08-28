import {
  Transport,
  WalletClient,
  Chain,
  Account,
  WriteContractParameters,
  WriteContractReturnType,
  Address,
  Hex,
  Abi,
} from 'viem'
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { OpChainL2 } from '@roninjin10/rollup-chains'
import { writeContract } from 'viem/actions'

type DepositERC20Parameters = {
  l1Token: Address
  l2Token: Address
  amount: bigint
  gasLimit: bigint
  data: Hex
}

export type WriteDepositERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof l1StandardBridgeABI,
    'depositERC20',
    TChain,
    TAccount,
    TChainOverride
  >,
  'abi' | 'functionName' | 'args' | 'address'
> & {
  toChain: OpChainL2
  args: DepositERC20Parameters
}

export interface WriteDepositERC20 {
  <
    TChain extends Chain | undefined,
    TAccount extends Account | undefined,
    TChainOverride extends Chain | undefined,
  >(
    client: WalletClient<Transport, TChain, TAccount>,
    {
      args: { l1Token, l2Token, amount, gasLimit, data },
      toChain,
      ...rest
    }: WriteDepositERC20Parameters<TChain, TAccount, TChainOverride>,
  ): Promise<WriteContractReturnType>
}

export async function writeDepositERC20<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { l1Token, l2Token, amount, gasLimit, data },
    toChain,
    ...rest
  }: WriteDepositERC20Parameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: toChain.opContracts.OptimismPortalProxy,
    abi: l1StandardBridgeABI,
    functionName: 'depositETH',
    args: [l1Token, l2Token, amount, gasLimit, data],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof l1StandardBridgeABI,
    'depositERC20',
    TChain,
    TAccount,
    TChainOverride
  >)
}
