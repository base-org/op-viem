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
                text: 'simulateDepositERC20',
                link: '/docs/actions/public/L1/simulateDepositERC20',
              },
              {
                text: 'simulateDepositETH',
                link: '/docs/actions/public/L1/simulateDepositETH',
              },
              // removing until we add it
              // {
              //   text: 'simulateOpStackL1',
              //   link: '/docs/actions/public/L1/simulateOpStackL1',
              // },
              {
                text: 'simulateProveWithdrawalTransaction',
                link: '/docs/actions/public/L1/simulateProveWithdrawalTransaction',
              },
              {
                text: 'getSecondsToNextL2Output',
                link: '/docs/actions/public/L1/getSecondsToNextL2Output',
              },
            ],
          },
          {
            text: 'L2',
            items: [
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
                text: 'writeUnsafeDepositTransaction',
                link: '/docs/actions/wallet/L1/writeUnsafeDepositTransaction',
              },
              {
                text: 'writeSendMessage',
                link: '/docs/actions/wallet/L1/writeSendMessage',
              },
              // removing until we add
              // {
              //   text: 'writeOpStackL1',
              //   link: '/docs/actions/wallet/L1/writeOpStackL1',
              // },
              {
                text: 'writeProveWithdrawalTransaction',
                link: '/docs/actions/wallet/L1/writeProveWithdrawalTransaction',
              },
              {
                text: 'writeFinalizeWithdrawalTransaction',
                link: '/docs/actions/wallet/L1/writeFinalizeWithdrawalTransaction',
              },
            ],
          },
          {
            text: 'L2',
            items: [
              {
                text: 'writeWithdrawETH',
                link: '/docs/actions/wallet/L2/writeWithdrawETH',
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
              // {
              //   text: 'getSourceHash',
              //   link: '/docs/actions/wallet/L1/getSourceHash',
              // },
              // {
              //   text: 'getTransactionDepositedEvents',
              //   link: '/docs/actions/wallet/L1/getTransactionDepositedEvents',
              // },
              // {
              //   text: 'rlpEncodeDepositTransaction',
              //   link: '/docs/actions/wallet/L1/rlpEncodeDepositTransaction',
              // },
            ],
          },
          {
            text: 'getWithdrawlMessageStorageSlot',
            link: '/docs/actions/wallet/L1/getWithdrawlMessageStorageSlot',
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
