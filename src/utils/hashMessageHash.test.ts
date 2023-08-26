import { hashMessageHash } from './hashMessageHash'
import { test, expect } from 'vitest'

test('returns correct source hash', async () => {
  const hash =
    '0xB1C3824DEF40047847145E069BF467AA67E906611B9F5EF31515338DB0AABFA2'
  // checked result of same method in OP SDK
  expect(hashMessageHash(hash)).toEqual(
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  )
})
