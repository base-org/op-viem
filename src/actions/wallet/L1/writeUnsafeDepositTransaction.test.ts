import { expect, test } from 'vitest'
import { publicClient, walletClient, testClient } from '../../../_test/utils'
import {
  DepositTransactionParameters,
  writeUnsafeDepositTransaction,
} from './writeUnsafeDepositTransaction'
import { accounts } from '../../../_test/constants'
import { mine } from 'viem/actions'
import { Address, decodeEventLog, encodeFunctionData, encodePacked } from 'viem'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { TransactionDepositedEvent } from '../../../types/depositTransaction'
import { base } from '@wagmi/chains'
import { mainnet } from 'wagmi'

test('default', async () => {
  expect(
    await writeUnsafeDepositTransaction(walletClient, {
      args: {
        to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
        value: 1n,
        gasLimit: 25000n,
        data: '0x',
        isCreation: false,
      },
      value: 0n,
      toChainId: base.id,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})

test('sends transaction to correct infered address', async () => {
  const hash = await writeUnsafeDepositTransaction(walletClient, {
    args: {
      to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
      value: 1n,
      gasLimit: 25000n,
      data: '0x',
      isCreation: false,
    },
    value: 1n,
    toChainId: base.id,
    account: accounts[0].address,
  })

  await mine(testClient, { blocks: 1 })

  const r = await publicClient.getTransactionReceipt({ hash })
  expect(r.to).toEqual(
    publicClient.chain.contracts['optimismPortal'][base.id].toLowerCase(),
  )
})

test('sends transaction to correct explicit address', async () => {
  const portal: Address = '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed'
  const hash = await writeUnsafeDepositTransaction(walletClient, {
    args: {
      to: portal,
      value: 1n,
      gasLimit: 25000n,
      data: '0x',
      isCreation: false,
    },
    value: 1n,
    chain: mainnet, // a chain with no optimismPortal
    optimismPortalAddress: portal,
    account: accounts[0].address,
  })

  await mine(testClient, { blocks: 1 })

  const r = await publicClient.getTransactionReceipt({ hash })
  expect(r.to).toEqual(portal.toLowerCase())
})

test('sends transaction to correct address with chain override', async () => {
  const portal: Address = '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed'
  const c = {
    ...walletClient.chain,
    contracts: {
      ...walletClient.chain.contracts,
      optimismPortal: {
        8453: portal,
      },
    },
  }

  const hash = await writeUnsafeDepositTransaction(walletClient, {
    args: {
      to: portal,
      value: 1n,
      gasLimit: 25000n,
      data: '0x',
      isCreation: false,
    },
    value: 1n,
    chain: c,
    toChainId: base.id,
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
  const hash = await writeUnsafeDepositTransaction(walletClient, {
    args,
    value: args.value!,
    toChainId: base.id,
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

  const hash = await writeUnsafeDepositTransaction(walletClient, {
    args,
    toChainId: base.id,
    account: accounts[0].address,
    value: 0n,
  })

  await mine(testClient, { blocks: 1 })

  const t = await publicClient.getTransaction({ hash })
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

  const hash = await writeUnsafeDepositTransaction(walletClient, {
    args,
    toChainId: base.id,
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
