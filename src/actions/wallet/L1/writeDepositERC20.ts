import { l1StandardBridgeABI } from "@eth-optimism/contracts-ts";
import {
  Account,
  Address,
  Chain,
  Hex,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from "viem";
import { writeContract } from "viem/actions";
import { ResolveChain, WriteActionBaseType } from "../../../types/actions";
import { DepositERC20Parameters } from "../../../types/depositERC20Parameters";
import { OpStackL1Contracts } from "../../../types/opStackContracts";
import { ContractToChainAddressMapping } from "./writeUnsafeDepositTransaction";

export type WriteDepositERC20Parameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _contractName extends OpStackL1Contracts = OpStackL1Contracts.optimismL1StandardBridge,
  _functionName extends string = "depositERC20",
  _resolvedChain extends Chain | undefined = ResolveChain<
    TChain,
    TChainOverride
  >,
> =
  & {
    args: DepositERC20Parameters;
  }
  & WriteActionBaseType<
    TChain,
    TAccount,
    typeof l1StandardBridgeABI,
    TChainOverride,
    _contractName,
    _functionName,
    _resolvedChain
  >;

/**
 * Deposits ERC20 tokens to L2
 * @param {Address} l1Token the L1 address of the ERC20 token to deposit
 * @param {Address} l2Token the L2 address of the ERC20 token to deposit
 * @param {bigint} amount the amount of tokens to deposit
 * @param {bigint} gasLimit the gas limit for the transaction
 * @param {Hex} [data] the data to send with the transaction
 * @returns {WriteContractReturnType} the transaction hash
 */
export async function writeDepositERC20<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { l1Token, l2Token, amount, gasLimit, data },
    chain = client.chain,
    l2ChainId,
    optimismL1StandardBridgeAddress,
    ...rest
  }: WriteDepositERC20Parameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> {
  const contracts = chain?.contracts as
    | ContractToChainAddressMapping
    | undefined;
  const bridge = optimismL1StandardBridgeAddress
    || (contracts && typeof l2ChainId === "number"
      ? contracts[OpStackL1Contracts.optimismL1StandardBridge][l2ChainId]
      : undefined);
  return writeContract(client, {
    address: bridge,
    abi: l1StandardBridgeABI,
    functionName: "depositERC20",
    args: [l1Token, l2Token, amount, gasLimit, data || "0x"],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof l1StandardBridgeABI,
    "depositERC20",
    TChain,
    TAccount,
    TChainOverride
  >);
}
