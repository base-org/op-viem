import { providers } from 'ethers'

import { CrossChainMessenger } from '@eth-optimism/sdk'
import { base, mainnet } from 'viem/chains'
import { localHttpUrl, localRollupHttpUrl } from './constants.js'

export const ethersProvider = new providers.JsonRpcProvider(localHttpUrl)
export const ethersRollupProvider = new providers.JsonRpcProvider(
  localRollupHttpUrl,
)
export const opSDKMessenger = new CrossChainMessenger({
  l1ChainId: mainnet.id,
  l2ChainId: base.id,
  l1SignerOrProvider: ethersProvider,
  l2SignerOrProvider: ethersRollupProvider,
})
