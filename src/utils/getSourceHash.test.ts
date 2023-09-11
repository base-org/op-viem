import { expect, test } from 'vitest'
import { SourceHashDomain } from '../types/depositTransaction.js'
import { getSourceHash } from './getSourceHash.js'

/*
    Check values
    L2 curl to get source hash: curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xe67200042bf79eef76850dd3986bdd544e7aceeb7bbf8449158088bdc582168a"],"id":1}' https://developer-access-mainnet.base.org/
    L1 tx: https://etherscan.io/tx/0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c
 */
test('returns correct source hash', () => {
  const sourceHash = getSourceHash({
    domain: SourceHashDomain.UserDeposit,
    logIndex: 196,
    l1BlockHash: '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7',
  })
  expect(sourceHash).toEqual(
    '0xd0868c8764d81f1749edb7dec4a550966963540d9fe50aefce8cdb38ea7b2213',
  )
})
