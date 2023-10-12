import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { expect, test } from 'vitest'
import { base, baseAddresses } from '../../../chains/base.js'
import { getSecondsToNextL2Output } from './getSecondsToNextL2Output.js'

test('get seconds to next L2 output', async () => {
  const l2Client = createPublicClient({
    chain: base,
    transport: http(),
  })
  const latestL2BlockNumber = await l2Client.getBlockNumber()

  const l1Client = createPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const time = await getSecondsToNextL2Output(l1Client, { latestL2BlockNumber, ...baseAddresses })
  expect(time).toBeDefined()
  // this is too noisy to node issues,
  // but I do think we should revert if latestL2BlockNumber
  // passed is less than latestBlock from the oracle
  // expect(time).toBeLessThan(1800n * 2n)
})
