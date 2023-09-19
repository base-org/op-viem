<br/>

<p align="center">
  <a href="https://op-viem-site.vercel.app/">
  <h1>OP Viem</h1>
  </a>
</p>

<p align="center">
  Viem Extension for OP Stack Chains
<p>

<br>

## Features

- Simplifies cross L1 & L2 interactions
- Seamless extension to [Viem](https://github.com/wagmi-dev/viem)
- TypeScript ready
- Test suite running against [forked](https://ethereum.org/en/glossary/#fork) Ethereum network

## Overview

```ts
// import modules
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
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
opStackL1PublicClient.getOutputForL2Block(blockNumber: 2725977n, l2Chain: base)
```

## Community

Check out the following places for more viem-related content:

- Follow [@wilsoncusack](https://twitter.com/wilsoncusack) Twitter for project updates

## Contributing

If you're interested in contributing, please read the [contributing docs](CONTRIBUTING.md) **before submitting a pull request**.

## Authors

- [@wilsoncusack](https://github.com/wilsoncusack) (wilsoncusack.eth [Twitter](https://twitter.com/wilsoncusack))
- [@zencephalon](https://github.com/zencephalon) (zencephalon.eth, [Twitter](https://twitter.com/zencephalon))
- [@roninjin10](https://github.com/roninjin10) (fucory.eth, [Twitter](https://twitter.com/FUCORY))

## License

[MIT](LICENSE.md) License
