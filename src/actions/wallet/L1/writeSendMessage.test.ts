import { l1CrossDomainMessengerABI } from '@eth-optimism/contracts-ts'
import { decodeEventLog, encodeFunctionData, Hex } from 'viem'
import { mine } from 'viem/actions'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { publicClient, testClient, walletClient } from '../../../_test/utils.js'
import { base } from '../../../chains/base.js'
import { writeSendMessage } from './writeSendMessage.js'

test('can successfully call sendsMessage', async () => {
  const args = {
    target: accounts[0].address,
    minGasLimit: 25000,
  }
  const hash = await writeSendMessage(walletClient, {
    args,
    value: 0n,
    l2Chain: base,
    account: accounts[0].address,
  })

  await mine(testClient, { blocks: 1 })

  const r = await publicClient.getTransactionReceipt({ hash: hash })
  let messageEvent
  for (const l of r.logs) {
    try {
      const event = decodeEventLog({
        abi: l1CrossDomainMessengerABI,
        data: l.data,
        topics: l.topics,
      })
      if (event.eventName === 'SentMessage') {
        messageEvent = event
      }
    } catch {}
  }

  expect(messageEvent).toBeDefined()
})

test('passes correct calldata to sendMessage', async () => {
  const args = {
    target: accounts[0].address,
    minGasLimit: 25000,
    message: '0x1234' as Hex,
  }
  const hash = await writeSendMessage(walletClient, {
    args,
    value: 0n,
    l2Chain: base,
    account: accounts[0].address,
  })

  await mine(testClient, { blocks: 1 })

  const t = await publicClient.getTransaction({ hash: hash })
  const expectedCalldata = encodeFunctionData({
    abi: l1CrossDomainMessengerABI,
    functionName: 'sendMessage',
    args: [args.target, args.message, args.minGasLimit],
  })
  expect(t.input).toEqual(expectedCalldata)
})
