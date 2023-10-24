import { type Address } from 'viem'
import { estimateGas, mine } from 'viem/actions'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { publicClient, rollupPublicClient, testClient } from '../../../_test/utils.js'
import { baseAddresses } from '../../../chains/index.js'
import { type DepositTransactionParameters } from '../../index.js'
import { simulateDepositTransaction } from './simulateDepositTransaction.js'

test('default', async () => {
  expect(
    await simulateDepositTransaction(publicClient, {
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

  const { request } = await simulateDepositTransaction(publicClient, {
    args,
    value: 1n,
    ...baseAddresses,
    account: accounts[0].address,
  })

  expect(request.address).toEqual(
    baseAddresses.portal.address,
  )
})

test('sends transaction to correct explicit address', async () => {
  const portal: Address = '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed'
  const { request } = await simulateDepositTransaction(publicClient, {
    args: {
      to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
      value: 1n,
      gasLimit: 25000n,
    },
    value: 1n,
    portal: portal,
    account: accounts[0].address,
  })

  expect(request.address).toEqual(portal)
})

test('correctly passes arugments', async () => {
  const args: DepositTransactionParameters = {
    to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
    value: 1n,
    gasLimit: 25000n,
    data: '0x',
    isCreation: false,
  }

  const { request } = await simulateDepositTransaction(publicClient, {
    args,
    ...baseAddresses,
    account: accounts[0].address,
    value: 2n,
  })

  await mine(testClient, { blocks: 1 })

  expect(request.value).toEqual(2n)
})

test('errors if portal not passed', async () => {
  expect(() =>
    // @ts-expect-error
    simulateDepositTransaction(publicClient, {
      args: {
        to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
        gasLimit: 25000n,
      },
      value: 0n,
      account: accounts[0].address,
    })
  ).rejects.toThrowError('Invalid address')
})
