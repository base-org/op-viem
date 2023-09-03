import { Hash, keccak256 } from "viem";
import { SourceHashDomain, TransactionDepositedEvent } from "../types/depositTransaction";
import { getDepositTransactionFromTransactionDepositedEvent } from "./getDepositTransactionFromTransactionDepositedEvent";
import { getSourceHash } from "./getSourceHash";
import { rlpEncodeDepositTransaction } from "./rlpEncodeDepositTransaction";

type GetL2HashFromDepositInfoParams = {
  event: TransactionDepositedEvent;
  logIndex: number;
  blockHash: Hash;
};

export function getL2HashFromL1DepositInfo({
  event,
  logIndex,
  blockHash,
}: GetL2HashFromDepositInfoParams) {
  const sourceHash = getSourceHash({
    domain: SourceHashDomain.UserDeposit,
    logIndex,
    l1BlockHash: blockHash,
  });
  const depositTx = getDepositTransactionFromTransactionDepositedEvent({
    event,
    sourceHash,
  });

  const rlp = rlpEncodeDepositTransaction(depositTx);

  return keccak256(rlp);
}
