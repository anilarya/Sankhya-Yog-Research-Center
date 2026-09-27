import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ReactMarkdown from 'react-markdown'
import { articles } from './content/articles'
import { papers } from './content/papers'
import './styles.css'

const asset = path => `${import.meta.env.BASE_URL}${path}`
const href = path => `#/${path}`
const readableDate = value => new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))

function Arrow({ diagonal = false }) { return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span> }
function Eyebrow({ children }) { return <span className="eyebrow">{children}</span> }

function Header({ route }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [route])
  return <header className="site-header">
    <div className="header-inner container">
      <a className="brand" href="#/" aria-label="Sankhya Yog Research Center, home">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span className="brand-name">SANKHYA YOG <small>RESEARCH CENTER</small></span>
      </a>
      <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '×' : '☰'}</span></button>
      <nav aria-label="Primary navigation" className={open ? 'nav open' : 'nav'}>
        {[['Home', ''], ['Research papers', 'papers'], ['Articles', 'articles'], ['About', 'about']].map(([label, path]) => <a key={label} className={(route === path || (path && route.startsWith(path + '/'))) ? 'active' : ''} href={href(path)}>{label}</a>)}
      </nav>
    </div>
  </header>
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-top">
      <div><span className="footer-symbol">◌</span><h2>A space for inquiry.<br /><em>A home for understanding.</em></h2></div>
      <div className="footer-links"><a href="#/papers">Research papers <Arrow /></a><a href="#/articles">Articles <Arrow /></a><a href="#/about">Our mission <Arrow /></a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Sankhya Yog Research Center</span><span>Study · Reflect · Explore</span></div>
  </footer>
}

function PaperCard({ paper }) {
  return <article className="publication-card">
    <div className="publication-meta"><span>{paper.category}</span><span>{paper.language}</span></div>
    <h3><a href={href(`papers/${paper.slug}`)}>{paper.title}</a></h3>
    <p>{paper.abstract}</p>
    <div className="publication-bottom"><span>{paper.authors} · {readableDate(paper.date)}</span><a href={href(`papers/${paper.slug}`)} aria-label={`Read ${paper.title}`}>Read paper <Arrow /></a></div>
  </article>
}

function ArticleCard({ article, featured = false }) {
  return <article className={`article-card ${featured ? 'featured' : ''}`}>
    <div className="article-card-top"><span className="article-icon" aria-hidden="true">✳</span><span>{article.category} / {article.readingTime}</span></div>
    <div><h3><a href={href(`articles/${article.slug}`)}>{article.title}</a></h3><p>{article.description}</p></div>
    <div className="article-card-bottom"><span>{readableDate(article.date)}</span><a href={href(`articles/${article.slug}`)} aria-label={`Read ${article.title}`}><Arrow diagonal /></a></div>
  </article>
}

function Home() {
  return <>
    <section className="hero"><div className="container hero-grid">
      <div className="hero-content"><Eyebrow>AN OPEN SPACE FOR PHILOSOPHICAL INQUIRY</Eyebrow><h1>Ancient insight.<br /><em>Careful inquiry.</em></h1><p>Exploring Sāṅkhya, Yoga Darśana, and Vedic thought through research, interpretation, and dialogue.</p><div className="hero-actions"><a className="button button-light" href="#/papers">Explore research <Arrow /></a><a className="text-link light-link" href="#/about">About the center <Arrow diagonal /></a></div></div>
      <div className="hero-art" aria-hidden="true"><div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><div className="hero-ring ring-three" /><div className="hero-center">सा<span>ङ्ख्य</span></div><span className="orbit-label orbit-top">विचार</span><span className="orbit-label orbit-bottom">योग</span></div>
    </div><div className="container hero-bottom"><span>THOUGHT, PRACTICE & THE SEARCH FOR KNOWLEDGE</span><span>01 / THE CENTER</span></div></section>

    <section className="intro-section container"><div className="section-heading"><Eyebrow>OUR PURPOSE</Eyebrow><h2>Where rigorous study meets <em>living inquiry.</em></h2></div><div className="intro-copy"><p>We bring together research papers and articles on the philosophical foundations of Sāṅkhya and Yoga. This is a place to read closely, question thoughtfully, and follow ideas back to their sources.</p><a className="text-link" href="#/about">Discover our mission <Arrow /></a></div></section>

    <section className="latest-section"><div className="container"><div className="section-title-row"><div><Eyebrow>THE ARCHIVE</Eyebrow><h2>Explore the work</h2></div><a className="text-link" href="#/papers">All research papers <Arrow /></a></div><div className="archive-grid"><div className="archive-panel dark-panel"><span className="panel-number">01 — PAPERS</span><div><h3>Research that invites a closer reading.</h3><p>Browse published papers and read PDFs in your browser. The research archive will grow as papers are added.</p><a className="button button-outline" href="#/papers">View papers <Arrow /></a></div></div><div className="archive-panel article-panel"><span className="panel-number">02 — ARTICLES</span><div><h3>Ideas written to be explored.</h3><p>Read articles on philosophy, interpretation, and the center’s work.</p><a className="button button-navy" href="#/articles">Read articles <Arrow /></a></div></div></div></div></section>

    <section className="founder-feature container"><div className="founder-image-wrap"><img src={asset('portraits/harish-chandra.webp')} alt="Portrait of Dr. Harish Chandra" /></div><div className="founder-feature-copy"><Eyebrow>FOUNDER & SCHOLAR</Eyebrow><h2>Dr. Harish Chandra</h2><p className="feature-lead">A life devoted to both scientific research and the study of the inner world.</p><p>From engineering research to Sāṅkhya and Yoga Darśana, Dr. Chandra brings an analytical approach to philosophical questions and the practice of meditation.</p><a className="text-link" href="#/about">Meet the founders <Arrow /></a></div></section>

    <section className="recent-section"><div className="container"><div className="section-title-row"><div><Eyebrow>FROM THE CENTER</Eyebrow><h2>Recent writing</h2></div><a className="text-link" href="#/articles">All articles <Arrow /></a></div><div className="recent-grid">{articles.slice(0, 2).map((a) => <ArticleCard key={a.slug} article={a} featured />)}</div></div></section>
  </>
}

function Papers() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All topics')
  const categories = ['All topics', ...new Set(papers.map(p => p.category))]
  const filtered = papers.filter(p => (category === 'All topics' || p.category === category) && `${p.title} ${p.authors} ${p.abstract} ${p.category}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  return <main className="page-main"><section className="page-heading container"><Eyebrow>THE RESEARCH ARCHIVE</Eyebrow><h1>Research <em>papers.</em></h1><p>Published studies and interpretations, available to read in your browser.</p></section><section className="container listing-section"><div className="listing-toolbar"><label className="search-field"><span aria-hidden="true">⌕</span><span className="sr-only">Search research papers</span><input type="search" placeholder="Search titles, authors, topics…" value={query} onChange={e => setQuery(e.target.value)} /></label><label className="select-field"><span className="sr-only">Filter by topic</span><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label></div>{filtered.length ? <div className="publication-list">{filtered.map(p => <PaperCard key={p.slug} paper={p} />)}</div> : <div className="empty-state"><span className="empty-mark">◌</span><h2>{papers.length ? 'No papers match your search.' : 'The research archive is taking shape.'}</h2><p>{papers.length ? 'Try a different title, author, or topic.' : 'The first papers will appear here when they are ready for publication.'}</p></div>}</section></main>
}

function PaperDetail({ slug }) {
  const paper = papers.find(p => p.slug === slug)
  if (!paper) return <NotFound />
  const pdf = asset(paper.pdf)
  return <main className="page-main"><div className="container detail-layout"><a href="#/papers" className="back-link">← All papers</a><div className="detail-heading"><Eyebrow>{paper.category} / {paper.language}</Eyebrow><h1>{paper.title}</h1><p className="detail-byline">{paper.authors} · {readableDate(paper.date)}</p><p className="detail-abstract">{paper.abstract}</p><div className="detail-actions"><a className="button button-navy" href={pdf} target="_blank" rel="noopener noreferrer">Open PDF <Arrow diagonal /></a><a className="text-link" href={pdf} download>Download PDF ↓</a></div></div><div className="pdf-shell"><iframe title={`PDF: ${paper.title}`} src={`${pdf}#view=FitH`} /><div className="pdf-fallback">If the document does not display, <a href={pdf} target="_blank" rel="noopener noreferrer">open the PDF in a new tab</a>.</div></div></div></main>
}

function Articles() {
  const [query, setQuery] = useState('')
  const filtered = articles.filter(a => `${a.title} ${a.description} ${a.category} ${a.author}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  return <main className="page-main"><section className="page-heading container"><Eyebrow>THE JOURNAL</Eyebrow><h1>Ideas for <em>reflection.</em></h1><p>Articles from the center, written for considered reading.</p></section><section className="container listing-section"><div className="listing-toolbar"><label className="search-field"><span aria-hidden="true">⌕</span><span className="sr-only">Search articles</span><input type="search" placeholder="Search articles…" value={query} onChange={e => setQuery(e.target.value)} /></label><span className="results-count">{filtered.length} {filtered.length === 1 ? 'ARTICLE' : 'ARTICLES'}</span></div>{filtered.length ? <div className="articles-grid">{filtered.map(a => <ArticleCard key={a.slug} article={a} />)}</div> : <div className="empty-state"><h2>No articles found.</h2><p>Try another search term.</p></div>}</section></main>
}

function ArticleDetail({ slug }) {
  const article = articles.find(a => a.slug === slug)
  if (!article) return <NotFound />
  return <main className="page-main"><article className="container reading-layout"><a className="back-link" href="#/articles">← All articles</a><header className="reading-header"><Eyebrow>{article.category} / {article.readingTime}</Eyebrow><h1>{article.title}</h1><p>{article.description}</p><div className="reading-meta">By {article.author} <span>·</span> {readableDate(article.date)}</div></header><div className="prose"><ReactMarkdown>{article.body}</ReactMarkdown></div><div className="reading-end"><span>✳</span><a href="#/articles">Explore more articles <Arrow /></a></div></article></main>
}

const founders = [
  { name: 'Dr. Harish Chandra', role: 'Founder · Scholar', image: 'harish-chandra.webp', alt: 'Portrait of Dr. Harish Chandra', bio: 'Dr. Harish Chandra studied engineering at IIT Kanpur and earned a PhD at Princeton University in mathematical simulation of automotive engine combustion. Following an international career in combustion research, he turned his full attention to the study and teaching of meditation philosophy in 1996. His work centers on Sāṅkhya, Yoga Darśana, and Pātañjala Upāsanā. His interpretation of these traditions is the intellectual foundation of the center.' },
  { name: 'Anil Arya', role: 'Co-founder · Technology', image: 'anil-arya.webp', alt: 'Portrait of Anil Arya', bio: 'Anil Arya is a lead software engineer in the IT industry. He helps make the center’s research and writing accessible through its digital platform.' },
  { name: 'Rounak Maheshwari', role: 'Co-founder · Professional practice', image: 'rounak-maheshwari.webp', alt: 'Portrait of Rounak Maheshwari', bio: 'Rounak Maheshwari is an experienced chartered accountancy professional and co-founder of the center.' },
]

function About() {
  return <main className="page-main"><section className="about-hero"><div className="container"><Eyebrow>ABOUT THE CENTER</Eyebrow><h1>Inquiry rooted in tradition.<br /><em>Open to careful examination.</em></h1><p>The Sankhya Yog Research Center brings research and accessible writing into one place for readers of Sāṅkhya, Yoga, and Vedic thought.</p></div></section><section className="container mission-grid"><div><Eyebrow>OUR MISSION</Eyebrow><h2>To study deeply.<br />To share openly.</h2></div><div><p>Our mission draws inspiration from Swami Dayanand Saraswati’s commitment to Vedic inquiry and from Dr. Harish Chandra’s scholarship on Sāṅkhya and Yoga Darśana. We publish work that invites readers to examine texts, arguments, and interpretations with care.</p><p>Dr. Chandra’s reading of Sāṅkhya and Pātañjala Upāsanā is an important part of this work. Interpretive claims are presented as scholarship for study and discussion.</p></div></section><section className="founders-section"><div className="container"><div className="section-title-row"><div><Eyebrow>THE PEOPLE</Eyebrow><h2>Meet the founders</h2></div></div><div className="founder-grid">{founders.map(f => <article className="founder-card" key={f.name}><div className="founder-photo"><img src={asset(`portraits/${f.image}`)} alt={f.alt} loading="lazy" /></div><span>{f.role}</span><h3>{f.name}</h3><p>{f.bio}</p></article>)}</div></div></section><section className="container contact-note"><span className="contact-symbol">✳</span><div><Eyebrow>GET IN TOUCH</Eyebrow><h2>Continue the conversation.</h2><p>Contact details will be added here when the center is ready to receive inquiries.</p></div></section></main>
}

function NotFound() { return <main className="container not-found"><Eyebrow>PAGE NOT FOUND</Eyebrow><h1>We could not find that page.</h1><a className="button button-navy" href="#/">Return home <Arrow /></a></main> }

function App() {
  const [route, setRoute] = useState(() => location.hash.replace(/^#\/?/, '').replace(/\/$/, ''))
  useEffect(() => { const update = () => { setRoute(location.hash.replace(/^#\/?/, '').replace(/\/$/, '')); window.scrollTo(0, 0) }; window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update) }, [])
  useEffect(() => { const title = route.startsWith('articles/') ? articles.find(a => a.slug === route.split('/')[1])?.title : route.startsWith('papers/') ? papers.find(p => p.slug === route.split('/')[1])?.title : ({ '': 'Home', papers: 'Research papers', articles: 'Articles', about: 'About' })[route]; document.title = `${title || 'Page not found'} | Sankhya Yog Research Center` }, [route])
  let page = route === '' ? <Home /> : route === 'papers' ? <Papers /> : route === 'articles' ? <Articles /> : route === 'about' ? <About /> : route.startsWith('papers/') ? <PaperDetail slug={route.split('/')[1]} /> : route.startsWith('articles/') ? <ArticleDetail slug={route.split('/')[1]} /> : <NotFound />
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header route={route} /><div id="main-content">{page}</div><Footer /></>
}

createRoot(document.getElementById('root')).render(<App />)
