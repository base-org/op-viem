import { test, expect } from 'vitest'
import { createPublicClient, http, toHex } from 'viem'
import { base } from '@wagmi/chains'
import { getProof } from './getProof'

test('correctly retrieves L2 hash', async () => {
  const client = createPublicClient({
    chain: base,
    transport: http(),
  })

  const result = await getProof(client, {
    address: '0x4200000000000000000000000000000000000016',
    storageKeys: [
      '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
    ],
    block: toHex(3155269n),
  })

  expect(result.storageProof[0].value).toEqual('0x1')
})
