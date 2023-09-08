import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'OP Viem',
  description: 'Viem extensions for the OP Stack',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/introduction/quickstart' },
    ],
    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Why op-viem', link: '/docs/introduction/introduction' },
          { text: 'Getting started', link: '/docs/introduction/getting-started' },
          { text: 'Benchmarks', link: '/docs/introduction/benchmarks' },
        ],
      },
      {
        text: 'Clients',
        items: [
          { text: 'Public Client', link: '/docs/clients/public' },
          { text: 'Wallet Client', link: '/docs/clients/wallet' },
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
              // removing until we correct
              // {
              //   text: 'simulateDepositERC20',
              //   link: '/docs/actions/public/L1/simulateDepositERC20',
              // },
              // {
              //   text: 'simulateDepositETH',
              //   link: '/docs/actions/public/L1/simulateDepositETH',
              // },
              {
                text: 'simulateOkStackL1',
                link: '/docs/actions/public/L1/simulateOpStackL1',
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
              // removing until we correct
              // {
              //   text: 'writeDepositERC20',
              //   link: '/docs/actions/wallet/L1/writeDepositERC20',
              // },
              // {
              //   text: 'writeDepositETH',
              //   link: '/docs/actions/wallet/L1/writeDepositETH',
              // },
              {
                text: 'writeUnsafeDepositTransaction',
                link: '/docs/actions/wallet/L1/writeUnsafeDepositTransaction',
              },
              {
                text: 'writeSendMessage',
                link: '/docs/actions/wallet/L1/writeSendMessage',
              },
              {
                text: 'writeOpStackL1',
                link: '/docs/actions/wallet/L1/writeOpStackL1',
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
                link: '/docs/actions/wallet/L1/getL2HashFromL1DepositInfo',
              },
              {
                text: 'getSourceHash',
                link: '/docs/actions/wallet/L1/getSourceHash',
              },
              {
                text: 'getTransactionDepositedEvents',
                link: '/docs/actions/wallet/L1/getTransactionDepositedEvents',
              },
              {
                text: 'rlpEncodeDepositTransaction',
                link: '/docs/actions/wallet/L1/rlpEncodeDepositTransaction',
              },
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
