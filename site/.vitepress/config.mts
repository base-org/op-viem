import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'OP Viem',
  description: 'Viem extensions for the OP Stack',
  // TODO remove
  ignoreDeadLinks: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/' },
    ],
    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: '/' },
          { text: 'Examples', link: '/docs/examples' },
        ],
      },
      {
        text: 'Public Actions',
        items: [
          {
            text: 'L1',
            items: [
              {
                text: 'getL2HashesForDepositTx',
                link: '/docs/actions/public/L1/getL2HashesForDepositTx',
              },
              {
                text: 'getOutputForL2Block',
                link: '/docs/actions/public/L1/getOutputForL2Block',
              },
              {
                text: 'getSecondsToFinalizable',
                link: '/docs/actions/public/L1/getSecondsToFinalizable',
              },
              {
                text: 'getSecondsToNextL2Output',
                link: '/docs/actions/public/L1/getSecondsToNextL2Output',
              },
              {
                text: 'readFinalizedWithdrawals',
                link: '/docs/actions/public/L1/readFinalizedWithdrawals',
              },
              {
                text: 'readProvenWithdrawals',
                link: '/docs/actions/public/L1/readProvenWithdrawals',
              },
              {
                text: 'simulateDepositERC20',
                link: '/docs/actions/public/L1/simulateDepositERC20',
              },
              {
                text: 'simulateDepositETH',
                link: '/docs/actions/public/L1/simulateDepositETH',
              },
              {
                text: 'simulateFinalizeWithdrawalTransaction',
                link: '/docs/actions/public/L1/simulateFinalizeWithdrawalTransaction',
              },
              {
                text: 'simulateProveWithdrawalTransaction',
                link: '/docs/actions/public/L1/simulateProveWithdrawalTransaction',
              },
            ],
          },
          {
            text: 'L2',
            items: [
              {
                text: 'getProveWithdrawalTransactionArgs',
                link: '/docs/actions/public/L2/getProveWithdrawalTransactionArgs',
              },
              {
                text: 'getWithdrawalMessages',
                link: '/docs/actions/public/L2/getWithdrawalMessages',
              },
              {
                text: 'simulateWithdrawERC20',
                link: '/docs/actions/public/L2/simulateWithdrawERC20',
              },
              {
                text: 'simulateWithdrawETH',
                link: '/docs/actions/public/L2/simulateWithdrawETH',
              },
            ],
          },
        ],
      },
      {
        text: 'Wallet Actions',
        items: [
          {
            text: 'L1',
            items: [
              {
                text: 'writeDepositERC20',
                link: '/docs/actions/wallet/L1/writeDepositERC20',
              },
              {
                text: 'writeDepositETH',
                link: '/docs/actions/wallet/L1/writeDepositETH',
              },
              {
                text: 'writeFinalizeWithdrawalTransaction',
                link: '/docs/actions/wallet/L1/writeFinalizeWithdrawalTransaction',
              },
              {
                text: 'writeOpStackL1',
                link: '/docs/actions/wallet/L1/writeOpStackL1',
              },
              {
                text: 'writeProveWithdrawalTransaction',
                link: '/docs/actions/wallet/L1/writeProveWithdrawalTransaction',
              },
              {
                text: 'writeSendMessage',
                link: '/docs/actions/wallet/L1/writeSendMessage',
              },
              {
                text: 'writeDepositTransaction',
                link: '/docs/actions/wallet/L1/writeDepositTransaction',
              },
            ],
          },
          {
            text: 'L2',
            items: [
              {
                text: 'writeOpStackL2',
                link: '/docs/actions/wallet/L2/writeOpStackL2',
              },
              {
                text: 'writeWithdrawETH',
                link: '/docs/actions/wallet/L2/writeWithdrawETH',
              },
              {
                text: 'writeWithdrawERC20',
                link: '/docs/actions/wallet/L2/writeWithdrawERC20',
              },
            ],
          },
        ],
      },
      {
        text: 'Utilities',
        items: [
          {
            text: 'Deposits',
            items: [
              {
                text: 'getDepositTransaction',
                link: '/docs/utilities/deposits/getDepositTransaction',
              },
              {
                text: 'getL2HashFromL1DepositInfo',
                link: '/docs/utilities/deposits/getL2HashFromL1DepositInfo',
              },
              {
                text: 'getSourceHash',
                link: '/docs/utilities/deposits/getSourceHash',
              },
              {
                text: 'getTransactionDepositedEvents',
                link: '/docs/utilities/deposits/getTransactionDepositedEvents',
              },
              {
                text: 'rlpEncodeDepositTransaction',
                link: '/docs/utilities/deposits/rlpEncodeDepositTransaction',
              },
            ],
          },
          {
            text: 'Withdrawals',
            items: [
              {
                text: 'getWithdrawlMessageStorageSlot',
                link: '/docs/utilities/withdrawals/getWithdrawlMessageStorageSlot',
              },
            ],
          },
        ],
      },
      {
        text: 'Glossary',
        items: [
          {
            text: 'Types',
            link: '/docs/glossary/types',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/base-org/op-viem' },
    ],
  },
})
