import { test, expect } from 'vitest'
import { createPublicClient, http } from 'viem'
import { base } from '@wagmi/chains'
import { publicOpStackActions } from '../../decorators/publicOpStack'

test('correctly retrieves L2 hash', async () => {
  const client = createPublicClient({
    chain: base,
    transport: http(),
  }).extend(publicOpStackActions)

  const messages = await client.getWithdrawalMessages({
    hash: '0x999bab960dbdf600c51371ae819957063337a50cec2eb8032412739defadabe7',
  })
  expect(messages.length).toEqual(1)
  expect(messages[0].nonce).toBeDefined()
  expect(messages[0].gasLimit).toBeDefined()
  expect(messages[0].data).toBeDefined()
  expect(messages[0].value).toBeDefined()
  expect(messages[0].sender).toBeDefined()
  expect(messages[0].target).toBeDefined()
  expect(messages[0].withdrawalHash).toBeDefined()
})
