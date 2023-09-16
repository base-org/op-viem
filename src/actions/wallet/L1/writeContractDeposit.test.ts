import { l1CrossDomainMessengerABI } from '@eth-optimism/contracts-ts'
import { decodeEventLog, encodeFunctionData } from 'viem'
import { mine } from 'viem/actions'
import { expect, test } from 'vitest'
import { erc721ABI } from 'wagmi'
import { accounts } from '../../../_test/constants.js'
import { publicClient, testClient, walletClient } from '../../../_test/utils.js'
import { base } from '../../../chains/base.js'
import { writeContractDeposit } from './writeContractDeposit.js'

test('default', async () => {
  const functionName = 'approve'
  const args: [`0x${string}`, bigint] = ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 2048n]
  const hash = await writeContractDeposit(walletClient, {
    abi: erc721ABI,
    address: '0x6171f829e107f70b58d67594c6b62a7d3eb7f23b',
    functionName,
    args,
    account: accounts[0].address,
    minGasLimit: 100000,
    l2Chain: base,
  })
  mine(testClient, { blocks: 1 })

  const r = await publicClient.getTransactionReceipt({ hash })
  expect(r.status).toEqual('success')
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
  expect(messageEvent?.args.message).toEqual(encodeFunctionData({
    abi: erc721ABI,
    args,
    functionName,
  }))
})
