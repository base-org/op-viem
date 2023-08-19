import { http, Hex, createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'
import { getL2HashForDepositTx } from './utils/getL2HashForDepositTx'

export const opStackClient = createPublicClient({
  chain: mainnet,
  transport: http(),
}).extend((client) => ({
  async getL2HashForDepositTx({
    l1TxHash,
    index,
  }: { l1TxHash: Hex; index?: number }) {
    return getL2HashForDepositTx({ l1TxHash, client, index })
  },
}))
