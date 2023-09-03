import { Hex } from "viem";

export type DepositETHParameters = {
  gasLimit: bigint;
  data?: Hex;
};
