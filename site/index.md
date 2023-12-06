# OP Viem

## Overview

op-viem is a TypeScript extension for [Viem](https://viem.sh) that provides actions for working with [OP Stack](https://stack.optimism.io/) L2 chains such as [Optimism](https://community.optimism.io/docs/useful-tools/networks/) and [Base](https://docs.base.org/).

## Features

- Simplifies cross L1 & L2 interactions
- Seamless extension to [Viem](https://github.com/wagmi-dev/viem)
- TypeScript ready
- Test suite running against [forked](https://ethereum.org/en/glossary/#fork) Ethereum network

## Installation

::: code-group

```bash [npm]
npm i op-viem
```

```bash [pnpm]
pnpm i op-viem
```

```bash [bun]
bun i op-viem
```

:::

## Example

```ts
// import modules
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
import { baseAddresses } from 'op-viem/chains'
import { walletL1OpStackActions, publicL1OpStackActions, publicL2OpStackActions } from 'op-viem'

// create clients
export const opStackL1WalletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletL1OpStackActions)

export const opStackL1PublicClient = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicL1OpStackActions)

export const opStackL2PublicClient = createPublicClient({
  chain: base,
  transport: http()
}).extend(publicL2OpStackActions)

// perform an action
opStackL1PublicClient.getOutputForL2Block(blockNumber: 2725977n, ...baseAddresses)
```
