import { expect, test } from 'vitest'
import { publicClient } from '../../../_test/utils.js'
import { baseAddresses } from '../../../chains/index.js'
import { getOutputForL2Block } from './getOutputForL2Block.js'

test('retrieves correctly', async () => {
  const result = await getOutputForL2Block(publicClient, {
    l2BlockNumber: 2725977n,
    ...baseAddresses,
  })
  expect(result.proposal).toBeDefined()
  expect(result.outputIndex).toBeDefined()
})
