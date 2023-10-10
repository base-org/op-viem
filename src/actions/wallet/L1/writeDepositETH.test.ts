import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { decodeEventLog, encodePacked } from 'viem'
import { mine } from 'viem/actions'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { publicClient, testClient, walletClient } from '../../../_test/utils.js'
import { base } from '../../../chains/index.js'
import type { DepositETHParameters, TransactionDepositedEvent } from '../../../index.js'
import { writeDepositETH } from './writeDepositETH.js'

test('default', async () => {
  expect(
    await writeDepositETH(walletClient, {
      args: {
        to: accounts[0].address,
        gasLimit: 21000,
        data: '0x',
      },
      value: 1n,
      l2Chain: base,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})

test('correctly deposits ETH', async () => {
  const args: DepositETHParameters = {
    to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
    gasLimit: 25000,
    data: '0x',
  }
  const value = 1n
  const hash = await writeDepositETH(walletClient, {
    args,
    value,
    l2Chain: base,
    account: accounts[0].address,
  })

  await mine(testClient, { blocks: 1 })

  const r = await publicClient.getTransactionReceipt({ hash })
  expect(r.logs.length).toEqual(1)
  const depositEvent = decodeEventLog({
    abi: optimismPortalABI,
    data: r.logs[0].data,
    topics: r.logs[0].topics,
  })
  expect(depositEvent.eventName).toEqual('TransactionDeposited')
  const deposit = depositEvent as TransactionDepositedEvent
  expect(deposit.args.from.toLowerCase()).toEqual(accounts[0].address)
  expect(deposit.args.to.toLowerCase()).toEqual(args.to)
  const expectOpaqueData = encodePacked(
    ['uint', 'uint', 'uint64', 'bool', 'bytes'],
    [value, value, BigInt(args.gasLimit), false, '0x'],
  )
  expect(deposit.args.opaqueData).toEqual(expectOpaqueData)
})
