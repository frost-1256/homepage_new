import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// blog/*.md のうち date 付きのものを新しい順にサイドバーへ
function postItems() {
  const dir = fileURLToPath(new URL('..', import.meta.url))
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((f) => {
      const fm = readFileSync(dir + f, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
      const get = (k: string) => fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^["']|["']$/g, '')
      return { f, title: get('title'), date: get('date') }
    })
    .filter((p) => p.date)
    .sort((a, b) => (a.date! < b.date! ? 1 : -1))
    .map((p) => ({ text: p.title ?? p.f, link: '/' + p.f.replace(/\.md$/, '') }))
}

// Served under /blog/ on Cloudflare Workers (assets: ./dist).
// Project root is blog/, build output goes to dist/blog alongside the root static files.
export default defineConfig({
  base: '/blog/',
  outDir: new URL('../../dist/blog', import.meta.url).pathname,
  title: "haru's notebook",
  description: 'haru / spring のブログ',
  lang: 'ja-JP',
  markdown: {
    breaks: true,
  },
  themeConfig: {
    sidebar: [
      {
        text: 'Posts',
        items: postItems(),
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/frost-1256' },
      { icon: 'x', link: 'https://twitter.com/haruuuuu_1256' },
    ],
  },
})
