import { providers } from 'ethers'

import { localHttpUrl } from './constants.js'

export const ethersProvider = new providers.JsonRpcProvider(localHttpUrl)
