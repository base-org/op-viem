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
  expect(messages.blockHash).toEqual(
    '0x287cf1320158a9402b38aceabfae4ccc560c86b9ee479ed89e42658d0a310784',
  )
  expect(messages.messages.length).toEqual(1)
  expect(messages.messages[0].nonce).toBeDefined()
  expect(messages.messages[0].gasLimit).toBeDefined()
  expect(messages.messages[0].data).toBeDefined()
  expect(messages.messages[0].value).toBeDefined()
  expect(messages.messages[0].sender).toBeDefined()
  expect(messages.messages[0].target).toBeDefined()
  expect(messages.messages[0].withdrawalHash).toBeDefined()
})
