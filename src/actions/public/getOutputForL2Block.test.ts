import { test, expect } from 'vitest'
import { getOutputForL2Block } from './getOutputForL2Block'
import { base } from '@roninjin10/rollup-chains'
import { publicClient } from '../../_test/utils'

test('retrieves correctly', async () => {
  const result = await getOutputForL2Block(publicClient, {
    blockNumber: 2725977n,
    rollup: base,
  })
  expect(result.proposal).toBeDefined()
  expect(result.outputIndex).toBeDefined()
})
