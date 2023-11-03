import { expect, test } from 'vitest'
import { publicClient } from '../../../_test/utils.js'
import { baseAddresses } from '../../../chains/index.js'
import { getLatestProposedL2BlockNumber } from './getLatestProposedL2BlockNumber.js'

test('retrieves correctly', async () => {
  const result = await getLatestProposedL2BlockNumber(publicClient, {
    ...baseAddresses,
  })
  expect(result.l2BlockNumber).toBeDefined()
})
