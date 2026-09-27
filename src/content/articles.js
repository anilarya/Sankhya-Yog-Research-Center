const modules = import.meta.glob('./articles/*.md', { query: '?raw', import: 'default', eager: true })

function parseArticle(path, raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) throw new Error(`Missing frontmatter in ${path}`)
  const metadata = Object.fromEntries(match[1].split(/\r?\n/).filter(Boolean).map(line => {
    const separator = line.indexOf(':')
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()]
  }))
  return { ...metadata, slug: path.split('/').pop().replace(/\.md$/, ''), body: match[2] }
}

export const articles = Object.entries(modules).map(([path, raw]) => parseArticle(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date))
