import { mainnet } from '@wagmi/chains'
import { createPublicClient, http } from 'viem'
import { test, expect } from 'vitest'
import { getOutputForL2Block } from './getOutputForL2Block'
import { base } from '@roninjin10/rollup-chains'

test('retrieves correctly', async () => {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const result = await getOutputForL2Block(client, {
    blockNumber: 2725977n,
    rollup: base,
  })
  expect(result.proposal).toBeDefined()
  expect(result.outputIndex).toBeDefined()
})
