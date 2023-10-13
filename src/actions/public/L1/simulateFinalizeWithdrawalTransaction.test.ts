import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { publicClient } from '../../../_test/utils.js'
import { baseAddresses } from '../../../chains/base.js'
import { type FinalizeWithdrawalTransactionParameters } from '../../wallet/L1/writeFinalizeWithdrawalTransaction.js'
import { simulateFinalizeWithdrawalTransaction } from './simulateFinalizeWithdrawalTransaction.js'

test('succesfully submits finalizeWithdrawalTransaction', async () => {
  const withdrawal: FinalizeWithdrawalTransactionParameters = {
    nonce: 1766847064778384329583297500742918515827483896875618958121606201292641795n,
    sender: '0x02f086dBC384d69b3041BC738F0a8af5e49dA181',
    target: '0x02f086dBC384d69b3041BC738F0a8af5e49dA181',
    value: 335000000000000000000n,
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
