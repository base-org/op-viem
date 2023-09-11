import { expect, test } from 'vitest'
import { rollupPublicClient } from '../../../_test/utils.js'
import { getWithdrawalMessages } from './getWithdrawalMessages.js'

test('correctly retrieves L2 hash', async () => {
  const messages = await getWithdrawalMessages(rollupPublicClient, {
    hash: '0x999bab960dbdf600c51371ae819957063337a50cec2eb8032412739defadabe7',
  })
  expect(messages.blockNumber).toEqual(2725977n)
  expect(messages.messages.length).toEqual(1)
  expect(messages.messages[0].nonce).toBeDefined()
  expect(messages.messages[0].gasLimit).toBeDefined()
  expect(messages.messages[0].data).toBeDefined()
  expect(messages.messages[0].value).toBeDefined()
  expect(messages.messages[0].sender).toBeDefined()
  expect(messages.messages[0].target).toBeDefined()
  expect(messages.messages[0].withdrawalHash).toBeDefined()
})
