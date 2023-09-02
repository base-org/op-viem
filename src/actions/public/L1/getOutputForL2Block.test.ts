import { test, expect } from 'vitest'
import { getOutputForL2Block } from './getOutputForL2Block'
import { publicClient } from '../../../_test/utils'
import { base } from 'viem/chains'

test('retrieves correctly', async () => {
  const result = await getOutputForL2Block(publicClient, {
    l2BlockNumber: 2725977n,
    l2ChainId: base.id,
  })
  expect(result.proposal).toBeDefined()
  expect(result.outputIndex).toBeDefined()
})
