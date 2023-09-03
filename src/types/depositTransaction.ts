import { Address, Hex } from "viem";

export const DEPOSIT_TX_PREFIX = "0x7E";

export enum SourceHashDomain {
  UserDeposit = 0,
  L1InfoDeposit = 1,
}

export type TransactionDepositedEvent = {
  eventName: "TransactionDeposited";
  args: {
    from: `0x${string}`;
    to: `0x${string}`;
    version: bigint;
    opaqueData: `0x${string}`;
  };
};

export type DepositTransaction = {
  sourceHash: Hex;
  from: Address;
  to: Address;
  mint: Hex;
  value: Hex;
  gas: Hex;
  isSystemTransaction: boolean;
  data: Hex;
};
