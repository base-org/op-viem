---
"op-viem": major
---

Leave alpha.

- writeDepositETH and simulateDepositETH now take an `args.amount` instead of using a value arg.
- getSecondsToNextL2Output throws an error if the passed latestL2BlockNumber is less than the latestBlockNumber reported by the l2OutputOracle.
- writeFinalizeWithdrawalTransaction takes an `args` parameter like most other actions.
