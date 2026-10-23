import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  excerpt?: string
}

// 日付持ちmd = 記事とみなして新しい順に
// index.md は一覧ページ自体なので除外する
export default createContentLoader(['*.md', '!index.md'], {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter((p) => p.frontmatter.date && p.url !== '/')
      .map((p) => {
        const d = p.frontmatter.date
        const date =
          d instanceof Date
            ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            : String(d)
        return {
          title: p.frontmatter.title ?? p.url,
          url: p.url,
          date,
          excerpt: p.excerpt,
        }
      })
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  },
})
