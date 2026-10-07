import DefaultTheme from 'vitepress/theme'
import './custom.css'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import { useData } from 'vitepress'

function fmt(d: unknown): string {
  if (d instanceof Date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return String(d)
}

function BlogDate() {
  const { frontmatter } = useData()
  return frontmatter.value.date
    ? h('p', { class: 'blog-date' }, fmt(frontmatter.value.date))
    : null
}

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'doc-top': () => h(BlogDate),
  }),
} satisfies Theme
