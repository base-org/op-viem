import { providers } from 'ethers'

import { localHttpUrl, localRollupHttpUrl } from './constants.js'

export const ethersProvider = new providers.JsonRpcProvider(localHttpUrl)
export const ethersRollupProvider = new providers.JsonRpcProvider(
  localRollupHttpUrl,
)
