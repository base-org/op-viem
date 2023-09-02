import { accounts } from '../../../_test/constants'
import { publicClient, testClient, walletClient } from '../../../_test/utils'
import { writeSendMessage } from './writeSendMessage'
import { l1CrossDomainMessengerABI } from '@eth-optimism/contracts-ts'
import { Hex, decodeEventLog, encodeFunctionData } from 'viem'
import { mine } from 'viem/actions'
import { base } from 'viem/chains'
import { expect, test } from 'vitest'

test('can successfully call sendsMessage', async () => {
  const args = {
    target: accounts[0].address,
    minGasLimit: 25000,
  }
  const hash = await writeSendMessage(walletClient, {
    args,
    value: 0n,
    l2ChainId: base.id,
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
    l2ChainId: base.id,
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
