import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { type Address, decodeEventLog, encodeFunctionData, encodePacked } from 'viem'
import { estimateGas, mine } from 'viem/actions'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { publicClient, rollupPublicClient, testClient, walletClient } from '../../../_test/utils.js'
import { baseAddresses } from '../../../chains/index.js'
import { type TransactionDepositedEvent } from '../../../types/depositTransaction.js'
import { type DepositTransactionParameters, writeDepositTransaction } from './writeDepositTransaction.js'

test('default', async () => {
  expect(
    await writeDepositTransaction(walletClient, {
      args: {
        to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
        value: 1n,
        gasLimit: 25000n,
        data: '0x',
        isCreation: false,
      },
      value: 0n,
      ...baseAddresses,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})

test('sends transaction to correct infered address', async () => {
  const args: DepositTransactionParameters = {
    to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
    value: 1n,
    gasLimit: 0n,
    data: '0x',
    isCreation: false,
  }

  const gas = await estimateGas(rollupPublicClient, {
    account: accounts[0].address,
    to: args.to,
    value: args.value,
    data: args.data,
  })

  args.gasLimit = gas

  const hash = await writeDepositTransaction(walletClient, {
    args,
    value: 1n,
    ...baseAddresses,
    account: accounts[0].address,
  })

  await mine(testClient, { blocks: 1 })

  const r = await publicClient.getTransactionReceipt({ hash })
  expect(r.to).toEqual(
    baseAddresses.optimismPortal.address.toLowerCase(),
  )
})

test('sends transaction to correct explicit address', async () => {
  const portal: Address = '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed'
  const hash = await writeDepositTransaction(walletClient, {
    args: {
      to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
      value: 1n,
      gasLimit: 25000n,
    },
    value: 1n,
    optimismPortal: portal,
    account: accounts[0].address,
  })

  await mine(testClient, { blocks: 1 })

  const r = await publicClient.getTransactionReceipt({ hash })
  expect(r.to).toEqual(portal.toLowerCase())
})

test('creates correct deposit transaction', async () => {
  const args: DepositTransactionParameters = {
    to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
    value: 1n,
    gasLimit: 25000n,
    data: '0x',
    isCreation: false,
  }
  const hash = await writeDepositTransaction(walletClient, {
    args,
    value: args.value!,
    ...baseAddresses,
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
    [args.value!, args.value!, args.gasLimit, args.isCreation!, args.data!],
  )
  expect(deposit.args.opaqueData).toEqual(expectOpaqueData)
})

test('correctly passes arugments', async () => {
  const args: DepositTransactionParameters = {
    to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
    value: 1n,
    gasLimit: 25000n,
    data: '0x',
    isCreation: false,
  }

  const hash = await writeDepositTransaction(walletClient, {
    args,
    ...baseAddresses,
    account: accounts[0].address,
    value: 2n,
  })

  await mine(testClient, { blocks: 1 })

  const t = await publicClient.getTransaction({ hash })
  expect(t.value).toEqual(2n)
  expect(t.input).toEqual(
    encodeFunctionData({
      abi: optimismPortalABI,
      functionName: 'depositTransaction',
      args: [args.to, args.value!, args.gasLimit, args.isCreation!, args.data!],
    }),
  )
})

test('uses defaults for data, isCreation, and value', async () => {
  const args: DepositTransactionParameters = {
    to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
    gasLimit: 25000n,
  }

  const hash = await writeDepositTransaction(walletClient, {
    args,
    ...baseAddresses,
    account: accounts[0].address,
    value: 0n,
  })

  await mine(testClient, { blocks: 1 })

  const t = await publicClient.getTransaction({ hash })
  expect(t.input).toEqual(
    encodeFunctionData({
      abi: optimismPortalABI,
      functionName: 'depositTransaction',
      args: [args.to, 0n, args.gasLimit, false, '0x'],
    }),
  )
})

test('errors if l2Chain and optimismPortalAddress both not passed', async () => {
  expect(() =>
    // @ts-expect-error
    writeDepositTransaction(walletClient, {
      args: {
        to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
        gasLimit: 25000n,
      },
      value: 0n,
      account: accounts[0].address,
    })
  ).rejects.toThrowError('Must provide optimismPortal')
})
