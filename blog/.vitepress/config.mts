import { defineConfig } from 'vitepress'

// Served under /blog/ on Cloudflare Workers (assets: ./dist).
// Project root is blog/, build output goes to dist/blog alongside the root static files.
export default defineConfig({
  base: '/blog/',
  outDir: new URL('../../dist/blog', import.meta.url).pathname,
  title: "haru's notebook",
  description: 'haru / spring のブログ',
  lang: 'ja-JP',
  themeConfig: {
    sidebar: [
      {
        text: 'Posts',
        items: [],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/frost-1256' },
      { icon: 'x', link: 'https://twitter.com/haruuuuu_1256' },
    ],
  },
})
