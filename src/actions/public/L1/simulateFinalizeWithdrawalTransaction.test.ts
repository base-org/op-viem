import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { publicClient } from '../../../_test/utils.js'
import { baseAddresses } from '../../../chains/base.js'
import { type FinalizeWithdrawalTransactionParameters } from '../../wallet/L1/writeFinalizeWithdrawalTransaction.js'
import { simulateFinalizeWithdrawalTransaction } from './simulateFinalizeWithdrawalTransaction.js'

// From https://etherscan.io/tx/0xcb571be93844895a45a4cf70cc4424fcc6ccf55dd4c14759da1efd57fa593ac5
test('succesfully submits finalizeWithdrawalTransaction', async () => {
  const withdrawal: FinalizeWithdrawalTransactionParameters = {
    nonce: 1766847064778384329583297500742918515827483896875618958121606201292642114n,
    sender: '0x54392fc895e6e44538975272E0dD7335fCcC9045',
    target: '0x54392fc895e6e44538975272E0dD7335fCcC9045',
    value: 20000000000000000n,
    gasLimit: 100000n,
    data: '0x01',
  }

  const { request } = await simulateFinalizeWithdrawalTransaction(publicClient, {
    ...baseAddresses,
    withdrawal,
    account: accounts[0].address,
  })

  expect(request.address).toEqual(baseAddresses.portal.address)
  expect(request.args[0]).toEqual(withdrawal)
})
