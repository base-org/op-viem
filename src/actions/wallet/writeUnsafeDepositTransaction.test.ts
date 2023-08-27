import { expect, test } from 'vitest'
import { publicClient, walletClient, testClient } from '../../_test/utils'
import {
  DepositTransactionParameters,
  writeUnsafeDepositTransaction,
} from './writeUnsafeDepositTransaction'
import { base } from '@roninjin10/rollup-chains'
import { accounts } from '../../_test/constants'
import { mine } from 'viem/actions'
import { encodeFunctionData } from 'viem'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'

test('default', async () => {
  expect(
    await writeUnsafeDepositTransaction(walletClient, {
      args: {
        to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
        value: 1n,
        gasLimit: 1n,
        data: '0x',
        isCreation: false,
      },
      toChain: base,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})

test('sends transaction to correct address', async () => {
  const hash = await writeUnsafeDepositTransaction(walletClient, {
    args: {
      to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
      value: 1n,
      gasLimit: 1n,
      data: '0x',
      isCreation: false,
    },
    toChain: base,
    account: accounts[0].address,
  })

  await mine(testClient, { blocks: 1 })

  const r = await publicClient.getTransactionReceipt({ hash })
  expect(r.to).toEqual(base.opContracts.OptimismPortalProxy.toLocaleLowerCase())
})

// TODO(wilson): consider deploying OP stack contracts to our anvil so that we can have better tests

test('correctly passes arugments', async () => {
  const args: DepositTransactionParameters = {
    to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
    value: 1n,
    gasLimit: 1n,
    data: '0x',
    isCreation: false,
  }

  const hash = await writeUnsafeDepositTransaction(walletClient, {
    args,
    toChain: base,
    account: accounts[0].address,
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
    gasLimit: 1n,
  }

  const hash = await writeUnsafeDepositTransaction(walletClient, {
    args,
    toChain: base,
    account: accounts[0].address,
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
