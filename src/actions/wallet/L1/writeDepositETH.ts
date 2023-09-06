import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { Account, Chain, Transport, WalletClient, WriteContractReturnType } from 'viem'
import { GetL1ChainId, WriteActionBaseType } from '../../../types/actions'
import { DepositETHParameters } from '../../../types/depositETHParameters'
import { OpStackChain, OpStackL1Contract } from '../../../types/opStackContracts'
import { writeOpStackL1, WriteOpStackL1Parameters } from './writeOpStackL1'

export type WriteDepositETHParameters<
  TL2Chain extends OpStackChain = OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain> = Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain & GetL1ChainId<TL2Chain> | undefined = Chain & GetL1ChainId<TL2Chain> | undefined,
  _abi extends typeof l1StandardBridgeABI = typeof l1StandardBridgeABI,
  _functionName extends string = 'depositETH',
  _contractName extends OpStackL1Contract = OpStackL1Contract.OptimismL1StandardBridge,
> =
  & { args: DepositETHParameters; value?: bigint }
  & WriteActionBaseType<TL2Chain, TChain, TAccount, TChainOverride, _abi, _contractName>

/**
 * Deposits ETH to L2
 * @param parameters - {@link WriteDepositETHParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeDepositETH<
  TL2Chain extends OpStackChain,
  TChain extends Chain & GetL1ChainId<TL2Chain>,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { minGasLimit, extraData = '0x' },
    l2Chain,
    optimismL1StandardBridgeAddress,
    ...rest
  }: WriteDepositETHParameters<TL2Chain, TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  return writeOpStackL1(client, {
    address: optimismL1StandardBridgeAddress,
    l2Chain,
    abi: l1StandardBridgeABI,
    functionName: 'depositETH',
    contract: OpStackL1Contract.OptimismL1StandardBridge,
    args: [minGasLimit, extraData],
    ...rest,
  } as unknown as WriteOpStackL1Parameters<
    TL2Chain,
    TChain,
    TAccount,
    TChainOverride,
    typeof l1StandardBridgeABI,
    'depositETH'
  >)
}
