import './style.css'
import Theme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  // enhanceApp({ app, router, siteData }) {
  //   // ...
  // },
}
