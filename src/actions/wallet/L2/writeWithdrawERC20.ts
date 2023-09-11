import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type {
  Account,
  Address,
  Chain,
  Hex,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'
import { opStackL2ChainContracts } from '../../../types/opStackContracts.js'

const ABI = l2StandardBridgeABI
const FUNCTION = 'withdrawTo'

type WithdrawParameters = {
  l2Token: Address
  to: Address
  amount: bigint
  minGasLimit: number
  extraData?: Hex
}

export type WithdrawERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: WithdrawParameters }
  & Omit<
    WriteContractParameters<typeof ABI, typeof FUNCTION, TChain, TAccount, TChainOverride>,
    'abi' | 'functionName' | 'args' | 'address'
  >

export async function writeWithdrawERC20<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(client: WalletClient<Transport, TChain, TAccount>, {
  args: { l2Token, to, amount, minGasLimit, extraData = '0x' },
  ...rest
}: WithdrawERC20Parameters<
  TChain,
  TAccount,
  TChainOverride
>): Promise<WriteContractReturnType> {
  return writeContract(client, {
    abi: ABI,
    functionName: FUNCTION,
    args: [l2Token, to, amount, minGasLimit, extraData],
    address: opStackL2ChainContracts.l2StandardBridge.address,
    ...rest,
  } as unknown as WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    TChain,
    TAccount,
    TChainOverride
  >)
}
