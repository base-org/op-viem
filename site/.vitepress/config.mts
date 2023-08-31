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
        items: [{ text: 'Quickstart', link: '/docs/introduction/quickstart' }],
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
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
