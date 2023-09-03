The plan? We build all the actions users would want into a opStackClient which extends the viem client. Things like

- getL2HashForDepositTx
- sendMessage
- bridgeERC20
- bridgeETH
- sendMessage
- depositTx
- withdrawal
- finalizeWithdrawal

Once we have these, we make nice react hooks for everything you'd want, like `useWriteDepositTx` which would return similar to `useWrite` but also have a means to get the L2 tx hash.
