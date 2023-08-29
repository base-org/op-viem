import { expect, test } from 'vitest'
import { publicClientMainnet } from '../../_test/utils'
import { base } from '@roninjin10/rollup-chains'
import { simulateDepositETH } from './simulateDepositETH'

test('default', async () => {
  expect(
    await simulateDepositETH(publicClientMainnet, {
      args: {
        gasLimit: 100000n,
        data: '0x',
      },
      value: 1n,
      toChain: base,
      account: '0xfd4f24676ed4588928213f37b126b53c07186f45',
    }),
  ).toBeDefined()
})
