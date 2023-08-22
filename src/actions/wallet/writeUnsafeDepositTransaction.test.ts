import { expect, test } from 'vitest'
import { walletClient } from '../../../_test/utils'
import { writeUnsafeDepositTransaction } from './writeUnsafeDepositTransaction'
import { base } from '@roninjin10/rollup-chains'
import { accounts } from '../../../_test/constants'

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
