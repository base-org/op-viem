export const poolId = Number(process.env.VITEST_POOL_ID ?? 1)
export const localHttpUrl = `http://127.0.0.1:8545/${poolId}`
export const localWsUrl = `ws://127.0.0.1:8545/${poolId}`
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    benchmark: {
      outputFile: './bench/report.json',
      reporters: process.env.CI ? ['json'] : ['verbose'],
    },
    coverage: {
      reporter: process.env.CI ? ['lcov'] : ['text', 'json', 'html'],
      exclude: [
        '**/errors/utils.ts',
        '**/dist/**',
        '**/*.test.ts',
        '**/_test/**',
      ],
    },
    environment: 'node',
    globalSetup: ['./src/_test/globalSetup.ts'],
    testTimeout: 10_000,
  },
})
