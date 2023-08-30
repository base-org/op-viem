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
        text: 'Wallet Actions',
        items: [
          {
            text: 'writeUnsafeDepositTransaction',
            link: '/docs/actions/wallet/writeUnsafeDepositTransaction',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
