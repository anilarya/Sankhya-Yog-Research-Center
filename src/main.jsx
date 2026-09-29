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
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Sankhya Yog Research Center · Bengaluru, India</span><a href="mailto:anilarya280@gmail.com">anilarya280@gmail.com</a></div>
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

function HeroEmblem() {
  return <div className="hero-art"><img className="hero-orbit-gif" src={asset('orbit-points.gif')} alt="" aria-hidden="true" /><svg className="hero-diagram" viewBox="0 0 520 520" role="img" aria-labelledby="diagram-title diagram-desc">
    <title id="diagram-title">Sāṅkhya and Yoga</title>
    <desc id="diagram-desc">A circular motif with Sāṅkhya and Yoga at its center, surrounded by inquiry and reflection.</desc>
    <defs><linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9d6e50" /><stop offset=".5" stopColor="#d6ab85" /><stop offset="1" stopColor="#93674c" /></linearGradient><radialGradient id="sun-glow"><stop offset="0" stopColor="#edbb87" stopOpacity=".37" /><stop offset="1" stopColor="#edbb87" stopOpacity="0" /></radialGradient></defs>
    <circle cx="260" cy="260" r="210" fill="none" stroke="url(#ring-gradient)" strokeWidth="1.5" opacity=".85" />
    <circle cx="260" cy="260" r="158" fill="none" stroke="#9e765d" strokeWidth="1.2" opacity=".72" />
    <circle cx="260" cy="260" r="107" fill="#162841" stroke="#b68a69" strokeWidth="1.3" />
    <circle cx="260" cy="50" r="4" fill="#d6ab85" /><circle cx="470" cy="260" r="4" fill="#d6ab85" /><circle cx="260" cy="470" r="4" fill="#d6ab85" /><circle cx="50" cy="260" r="4" fill="#d6ab85" />
    <path d="M260 72v14 M260 434v14 M72 260h14 M434 260h14" stroke="#c69b77" strokeWidth="1" opacity=".8" />
    <g className="hero-sun" aria-hidden="true"><circle cx="260" cy="190" r="43" fill="url(#sun-glow)" /><g className="hero-sun-rays" fill="none" stroke="#ddb283" strokeWidth="1.5" strokeLinecap="round" opacity=".82"><path d="M260 165v8 M260 207v8 M235 190h8 M277 190h8 M242 172l6 6 M272 202l6 6 M278 172l-6 6 M248 202l-6 6" /></g><circle cx="260" cy="190" r="10" fill="#e9b982" /><circle cx="260" cy="190" r="6" fill="#f7d8a5" /></g>
    <text x="260" y="270" textAnchor="middle" className="diagram-main">सांख्य</text>
    <path d="M228 287h64" stroke="#b88968" strokeWidth="1" opacity=".8" />
    <text x="260" y="327" textAnchor="middle" className="diagram-secondary">योग</text>
    <text x="402" y="125" textAnchor="middle" className="diagram-label">विचार</text>
    <text x="112" y="412" textAnchor="middle" className="diagram-label">अध्ययन</text>
  </svg></div>
}

const inspirations = [
  { name: 'Maharshi Kapila', context: 'Sāṅkhya', description: 'The sage traditionally associated with the foundations of Sāṅkhya thought.' },
  { name: 'Maharshi Patañjali', context: 'Yoga', description: 'A guiding voice for the study of Yoga Darśana and inner practice.' },
  { name: 'Swami Dayanand Saraswati', context: 'Vedic inquiry', description: 'An inspiration for thoughtful engagement with the Vedas.' },
  { name: 'Jīvanmukta saints', context: 'Living wisdom', description: 'The lives and teachings of liberated sages encourage sincere inquiry and practice.' },
]

function Inspiration() {
  return <section className="inspiration-section"><div className="container"><div className="inspiration-header"><div><Eyebrow>INSPIRATIONAL PERSONALITIES</Eyebrow><h2>Wisdom that guides <em>our inquiry.</em></h2></div><p>We draw inspiration from sages and teachers across the traditions we study. Their place here is one of inspiration; the center is an independent research body.</p></div><div className="inspiration-grid">{inspirations.map((person, index) => <article className="inspiration-card" key={person.name}><span className="inspiration-number">0{index + 1} <span aria-hidden="true">✳</span></span><div><span className="inspiration-context">{person.context}</span><h3>{person.name}</h3><p>{person.description}</p></div></article>)}</div></div></section>
}

function FeaturedMantra() {
  return <section className="featured-mantra" aria-labelledby="mantra-heading"><div className="container">
    <div className="mantra-heading"><div><Eyebrow>VEDIC REFLECTION · YAJURVEDA 7.5</Eyebrow><h2 id="mantra-heading">A mantra for <em>inner inquiry.</em></h2></div><span className="mantra-reference">यजुर्वेद · ७.५</span></div>
    <blockquote className="mantra-verse" lang="sa">अन्तस्ते द्यावापृथिवी दधाम्यन्तर्दधाम्युर्वन्तरिक्षम् ।<br />सजूर्देवेभिरवरैः परैश्चान्तर्यामे मघवन्मादयस्व ॥</blockquote>
    <div className="mantra-meaning" lang="hi">
      <article><h3>पदार्थ</h3><p>हे (मघवन्) योगी! मैं परमेश्वर (ते) तेरे (अन्तः) हृदयाकाश में (द्यावापृथिवी) सूर्य्य-भूमि के समान विज्ञानादि पदार्थों को (दधामि) स्थापित करता हूं तथा (उरु) विस्तृत (अन्तरिक्षम्) अवकाश को (अन्तः) शरीर के भीतर (दधामि) धरता हूं (सजूः) मित्र के समान तू (देवेभिः) विद्वानों से विद्या को प्राप्त हो के (अवरैः) (परैः) (च) थोड़े वा बहुत योग व्यवहारों से (अन्तर्य्यामे) भीतरले नियमों में वर्त्तमान होकर अन्य सब को (मादयस्व) प्रसन्न किया कर॥५॥</p></article>
      <article><h3>भावार्थ</h3><p>इस मन्त्र में वाचकलुप्तोपमालङ्कार है। ईश्वर का यह उपदेश है कि ब्रह्माण्ड में जिस प्रकार के जितने पदार्थं हैं, उसी प्रकार के उतने ही मेरे ज्ञान में वर्त्तमान हैं। योगविद्या को नहीं जानने वाला उनको नहीं देख सकता और मेरी उपासना के विना कोई योगी नहीं हो सकता है॥५॥</p></article>
    </div>
  </div></section>
}

function Home() {
  return <>
    <section className="hero"><div className="container hero-grid">
      <div className="hero-content"><Eyebrow>WHERE PRACTICE MEETS THEORY</Eyebrow><h1>Ancient wisdom.<br /><em>Rigorous inquiry.</em></h1><p>Exploring Sāṅkhya, Yoga Darśana, and Vedic thought through research, interpretation, and dialogue.</p><div className="hero-actions"><a className="button button-light" href="#/papers">Browse research papers <Arrow /></a><a className="text-link light-link" href="#/about">Meet the center <Arrow diagonal /></a></div></div>
      <HeroEmblem />
    </div><div className="container hero-bottom"><span>THOUGHT, PRACTICE & THE SEARCH FOR KNOWLEDGE</span><span>01 / THE CENTER</span></div></section>

    <FeaturedMantra />

    <section className="intro-section container"><div className="section-heading"><Eyebrow>OUR PURPOSE</Eyebrow><h2>Where rigorous study meets <em>living inquiry.</em></h2></div><div className="intro-copy"><p>We bring together research papers and articles on the philosophical foundations of Sāṅkhya and Yoga. The center accepts the ten principles of Arya Samaj as its core principles and pursues this research as an independent body.</p><a className="text-link" href="#/about">Discover our mission <Arrow /></a></div></section>

    <Inspiration />

    <section className="latest-section"><div className="container"><div className="section-title-row"><div><Eyebrow>THE ARCHIVE</Eyebrow><h2>Explore the work</h2></div><a className="text-link" href="#/papers">All research papers <Arrow /></a></div><div className="archive-grid"><div className="archive-panel dark-panel"><span className="panel-number">01 — PAPERS</span><div><h3>Research that invites a closer reading.</h3><p>Browse published papers and read PDFs in your browser. The research archive will grow as papers are added.</p><a className="button button-outline" href="#/papers">View papers <Arrow /></a></div></div><div className="archive-panel article-panel"><span className="panel-number">02 — ARTICLES</span><div><h3>Ideas written to be explored.</h3><p>Read articles on philosophy, interpretation, and the center’s work.</p><a className="button button-navy" href="#/articles">Read articles <Arrow /></a></div></div></div></div></section>

    <section className="dayanand-section"><div className="container dayanand-grid"><div className="dayanand-copy"><Eyebrow>INSPIRATION BEHIND THE MISSION</Eyebrow><h2>Swami Dayanand<br /><em>Saraswati</em></h2><p className="feature-lead">A commitment to Vedic inquiry that continues to inspire careful study.</p><p>The center draws inspiration from Swami Dayanand Saraswati’s work. We seek to carry that spirit of inquiry into the study of Sāṅkhya, Yoga Darśana, and related texts.</p><a className="text-link" href="#/about">Read about our mission <Arrow /></a></div><figure className="dayanand-figure"><img src={asset('portraits/swami-dayanand-saraswati.jpg')} alt="Historic 1874 photograph of Swami Dayanand Saraswati seated" loading="lazy" /><figcaption>Swami Dayanand Saraswati · <a href="https://commons.wikimedia.org/wiki/File:Dayananda_Saraswati.jpg" target="_blank" rel="noopener noreferrer">Historic photograph, Wikimedia Commons</a></figcaption></figure></div></section>

    <section className="home-founders"><div className="container"><div className="section-title-row"><div><Eyebrow>THE PEOPLE BEHIND THE CENTER</Eyebrow><h2>Our founders</h2></div><a className="text-link" href="#/about/founders">Read their profiles <Arrow /></a></div><div className="home-founder-grid">{founders.map(f => <a className="home-founder" href="#/about/founders" key={f.name}><div className="home-founder-photo"><img src={asset(`portraits/${f.image}`)} alt={f.alt} loading="lazy" /></div><span>{f.role}</span><h3>{f.name} <Arrow diagonal /></h3></a>)}</div></div></section>

    <section className="recent-section"><div className="container"><div className="section-title-row"><div><Eyebrow>FROM THE CENTER</Eyebrow><h2>Recent writing</h2></div><a className="text-link" href="#/articles">All articles <Arrow /></a></div><div className="recent-grid">{articles.slice(0, 2).map((a) => <ArticleCard key={a.slug} article={a} featured />)}</div></div></section>
  </>
}

function Papers() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All topics')
  const [language, setLanguage] = useState('All languages')
  const categories = ['All topics', ...new Set(papers.map(p => p.category))]
  const languages = ['English', 'Hindi', ...new Set(papers.map(p => p.language).filter(value => value && !['English', 'Hindi'].includes(value)))].sort((a, b) => (a === 'English' ? -1 : b === 'English' ? 1 : a === 'Hindi' ? -1 : b === 'Hindi' ? 1 : a.localeCompare(b)))
  const matching = papers.filter(p => (category === 'All topics' || p.category === category) && `${p.title} ${p.authors} ${p.abstract} ${p.category} ${p.language}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
  const filtered = matching.filter(p => language === 'All languages' || p.language === language)
  const groups = (language === 'All languages' ? languages : [language]).map(name => ({ name, entries: filtered.filter(p => p.language === name) })).filter(group => group.entries.length)
  return <main className="page-main"><section className="page-heading container"><Eyebrow>THE RESEARCH ARCHIVE</Eyebrow><h1>Research <em>papers.</em></h1><p>Explore published studies by language, or search across titles, authors, topics, and abstracts. Read each PDF in your browser.</p></section><section className="container listing-section"><div className="language-filter" role="group" aria-label="Filter papers by language">{['All languages', ...languages].map(name => <button type="button" key={name} className={`language-option${language === name ? ' selected' : ''}`} aria-pressed={language === name} onClick={() => setLanguage(name)}>{name}<span>{name === 'All languages' ? matching.length : matching.filter(p => p.language === name).length}</span></button>)}</div><div className="listing-toolbar"><label className="search-field"><span aria-hidden="true">⌕</span><span className="sr-only">Search research papers</span><input type="search" placeholder="Search titles, authors, topics, languages…" value={query} onChange={e => setQuery(e.target.value)} /></label><label className="select-field"><span className="sr-only">Filter by topic</span><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label></div><p className="paper-results" role="status">{filtered.length} {filtered.length === 1 ? 'paper' : 'papers'} {language === 'All languages' ? 'across all languages' : `in ${language}`}</p>{filtered.length ? groups.map(group => <section className="paper-language-group" key={group.name} aria-label={`${group.name} papers`}><div className="paper-group-heading"><h2>{group.name} papers</h2><span>{group.entries.length} {group.entries.length === 1 ? 'PAPER' : 'PAPERS'}</span></div><div className="publication-list">{group.entries.map(p => <PaperCard key={p.slug} paper={p} />)}</div></section>) : <div className="empty-state"><span className="empty-mark">◌</span><h2>{papers.length ? 'No papers match these filters.' : 'The research archive is taking shape.'}</h2><p>{papers.length ? 'Try another language, topic, or search term.' : 'English and Hindi papers will appear here when they are ready for publication.'}</p></div>}</section></main>
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
  { name: 'Dr. Harish Chandra', role: 'Founder · Scholar', image: 'harish-chandra.webp', alt: 'Portrait of Dr. Harish Chandra', summary: 'Scientist and scholar of Sāṅkhya, Yoga Darśana, and Pātañjala Upāsanā.', bio: 'Dr. Harish Chandra studied engineering at IIT Kanpur and earned a PhD at Princeton University in mathematical simulation of automotive engine combustion. Following an international career in combustion research, he turned his full attention to the study and teaching of meditation philosophy in 1996. His work centers on Sāṅkhya, Yoga Darśana, and Pātañjala Upāsanā. His interpretation of these traditions is the intellectual foundation of the center. He also co-founded and runs the Center of Inner Science (CIS), a separate organization active in the UK and USA.' },
  { name: 'Rounak Maheshwari', role: 'Co-founder · Professional practice', image: 'rounak-maheshwari.webp', alt: 'Portrait of Rounak Maheshwari', summary: 'Chartered accountancy professional and co-founder of this center.', bio: 'Rounak Maheshwari is an experienced chartered accountancy professional and co-founder of the Sankhya Yog Research Center. He also co-founded and helps run Samyak Dhyan Sangh (SDS), a separate initiative that brings people together to learn and practice Pātañjala Upāsanā.' },
  { name: 'Anil Arya', role: 'Co-founder · Technology', image: 'anil-arya.webp', alt: 'Portrait of Anil Arya', summary: 'Software engineer helping make the center’s research accessible online.', bio: 'Anil Arya is a lead software engineer in the IT industry. He earned a B.Tech in Computer Science and Engineering from Motilal Nehru National Institute of Technology Allahabad, Prayagraj. He helps make the center’s research and writing accessible through its digital platform.' },
]

function About() {
  return <main className="page-main"><section className="about-hero"><div className="container"><Eyebrow>ABOUT THE CENTER</Eyebrow><h1>Inquiry rooted in tradition.<br /><em>Open to careful examination.</em></h1><p>Based in Bengaluru, India, the Sankhya Yog Research Center brings research and accessible writing into one place for readers of Sāṅkhya, Yoga, and Vedic thought.</p></div></section><section className="container mission-grid"><div><Eyebrow>OUR MISSION</Eyebrow><h2>To study deeply.<br />To share openly.</h2></div><div><p>Maharshi Kapila, Maharshi Patañjali, Swami Dayanand Saraswati, and other jīvanmukta saints are inspirational personalities for our inquiry. Dr. Harish Chandra’s scholarship on Sāṅkhya and Yoga Darśana informs the center’s work. We accept the ten principles of Arya Samaj as our core principles and publish work that invites readers to examine texts, arguments, and interpretations with care.</p><p>Dr. Chandra’s reading of Sāṅkhya and Pātañjala Upāsanā is an important part of this work. Interpretive claims are presented as scholarship for study and discussion.</p></div></section><section className="principles-section"><div className="container principles-grid"><div><Eyebrow>OUR FOUNDATION</Eyebrow><h2>Ten principles.<br /><em>Independent inquiry.</em></h2></div><div><p>The Sankhya Yog Research Center accepts the ten principles of Arya Samaj as its core principles. It is an independent body and is not an organizational branch of any Arya Samaj, Arya Pratinidhi Sabha, or other Arya Samaj institution.</p><a className="text-link" href="https://aryasamaj.com/?page_id=151" target="_blank" rel="noopener noreferrer">Read the ten principles <Arrow diagonal /></a></div></div></section><section className="about-dayanand container"><div className="about-dayanand-photo"><img src={asset('portraits/swami-dayanand-saraswati.jpg')} alt="Historic photograph of Swami Dayanand Saraswati" loading="lazy" /></div><div><Eyebrow>THE INSPIRATION</Eyebrow><h2>Swami Dayanand Saraswati</h2><p>His dedication to Vedic study inspires the center’s mission. He is honored here as a source of inspiration; the center itself was established by Dr. Harish Chandra, Anil Arya, and Rounak Maheshwari.</p><a href="https://commons.wikimedia.org/wiki/File:Dayananda_Saraswati.jpg" target="_blank" rel="noopener noreferrer">Historic photograph: Wikimedia Commons <Arrow diagonal /></a></div></section><section className="founders-section"><div className="container">
    <div id="founders" className="section-title-row"><div><Eyebrow>THE PEOPLE</Eyebrow><h2>Meet the founders</h2></div></div>
    <div className="founder-grid">{founders.map(f => <article className="founder-card" key={f.name}>
      <div className="founder-photo"><img src={asset(`portraits/${f.image}`)} alt={f.alt} loading="lazy" /></div>
      <span>{f.role}</span><h3>{f.name}</h3><p>{f.summary}</p>
    </article>)}</div>
    <div className="founder-detail-grid">
      <article className="founder-detail"><Eyebrow>DR. HARISH CHANDRA · SCHOLARSHIP</Eyebrow><h3>Science and the study of mind</h3><p>{founders[0].bio}</p></article>
      <article className="founder-detail"><Eyebrow>ROUNAK MAHESHWARI · CO-FOUNDER</Eyebrow><h3>Community and practice</h3><p>{founders[1].bio}</p>
        <div className="sds-contact"><div><span>SDS COMMUNITY CONTACT</span><a className="sds-phone" href="https://wa.me/919082703043" target="_blank" rel="noopener noreferrer">+91 90827 03043 <Arrow diagonal /></a><a className="sds-channel-link" href="https://whatsapp.com/channel/0029Vb6eLkPJ93wRvtmnoB2O" target="_blank" rel="noopener noreferrer">Join SDS channel <Arrow diagonal /></a><small>Scan the code to join the channel</small></div><a className="sds-qr" href="https://whatsapp.com/channel/0029Vb6eLkPJ93wRvtmnoB2O" target="_blank" rel="noopener noreferrer" aria-label="Join the SDS WhatsApp channel"><img src={asset('sds-channel-qr.svg')} alt="QR code for the SDS WhatsApp channel" loading="lazy" /></a></div>
      </article>
    </div>
    <div className="founder-achievements"><div className="achievement-intro"><Eyebrow>ANIL ARYA · EDUCATION & PRESENTATIONS</Eyebrow><h3>Research in conversation</h3><p>Alongside his work in technology, Anil presents research on consciousness and transformation.</p></div><div className="achievement-list"><div className="achievement-item"><span className="achievement-date">Education</span><div><h4>B.Tech, Computer Science and Engineering</h4><p>Motilal Nehru National Institute of Technology Allahabad, Prayagraj</p></div></div><div className="achievement-item"><span className="achievement-date">Presented · Aug 2026</span><div><h4>Scientific Pathway to Validate Self-Consciousness</h4><p>International Conference on Integral Education: Theory, Practice and Transformation, AURO University, 10–11 August 2026.</p><a href="https://www.aurouniversity.edu.in/event/international-conference-on-integral-education-theory-practice-and-transformation/" target="_blank" rel="noopener noreferrer">Conference details <Arrow diagonal /></a></div></div><div className="achievement-item"><span className="achievement-date">Upcoming · Oct 2026</span><div><h4>Integral Transformation and Conscious Evolution</h4><p>Planned presentation at Living Veda 2026: International Conference on Application of Vedic Knowledge in the Light of Sri Aurobindo, Puducherry, 24–25 October 2026.</p><a href="https://aurosociety.org/society/viewupcomingevents/2372/Upcoming+Events" target="_blank" rel="noopener noreferrer">Conference details <Arrow diagonal /></a></div></div></div></div></div></section><section className="container contact-note"><span className="contact-symbol">✳</span><div><Eyebrow>GET IN TOUCH</Eyebrow><h2>Continue the conversation.</h2><p>Based in Bengaluru, India. For research and general inquiries, write to <a href="mailto:anilarya280@gmail.com">anilarya280@gmail.com</a>.</p></div></section></main>
}

function NotFound() { return <main className="container not-found"><Eyebrow>PAGE NOT FOUND</Eyebrow><h1>We could not find that page.</h1><a className="button button-navy" href="#/">Return home <Arrow /></a></main> }

function DeploymentVersion() {
  const [newVersion, setNewVersion] = useState('')
  const builtVersion = import.meta.env.VITE_DEPLOY_SHA

  useEffect(() => {
    if (!builtVersion) return
    let active = true
    const check = async () => {
      try {
        const manifestUrl = new URL(`${import.meta.env.BASE_URL}version.json`, window.location.href)
        manifestUrl.searchParams.set('check', String(Date.now()))
        const response = await fetch(manifestUrl, { cache: 'no-store' })
        if (!response.ok) return
        const { version } = await response.json()
        if (!active || !version || version === builtVersion) return
        const key = `syrc-reload-${version}`
        if (sessionStorage.getItem(key)) {
          setNewVersion(version)
          return
        }
        sessionStorage.setItem(key, '1')
        refresh(version)
      } catch { /* The current page remains usable when offline. */ }
    }
    const onVisible = () => { if (document.visibilityState === 'visible') check() }
    check()
    const timer = window.setInterval(check, 60_000)
    window.addEventListener('focus', check)
    document.addEventListener('visibilitychange', onVisible)
    return () => { active = false; clearInterval(timer); window.removeEventListener('focus', check); document.removeEventListener('visibilitychange', onVisible) }
  }, [builtVersion])

  if (!newVersion) return null
  return <div className="version-notice" role="status"><span>A new version is available.</span><button onClick={() => refresh(newVersion)}>Refresh site</button></div>
}

function refresh(version) {
  const url = new URL(window.location.href)
  url.searchParams.set('release', `${version.slice(0, 12)}-${Date.now()}`)
  window.location.replace(url.href)
}

function App() {
  const [route, setRoute] = useState(() => location.hash.replace(/^#\/?/, '').replace(/\/$/, ''))
  useEffect(() => { const update = () => setRoute(location.hash.replace(/^#\/?/, '').replace(/\/$/, '')); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update) }, [])
  useEffect(() => {
    const target = route === 'about/founders' ? document.getElementById('founders') : null
    const top = target ? target.getBoundingClientRect().top + window.scrollY - 98 : 0
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' })
  }, [route])
  useEffect(() => { const title = route.startsWith('articles/') ? articles.find(a => a.slug === route.split('/')[1])?.title : route.startsWith('papers/') ? papers.find(p => p.slug === route.split('/')[1])?.title : ({ '': 'Home', papers: 'Research papers', articles: 'Articles', about: 'About', 'about/founders': 'Founders' })[route]; document.title = `${title || 'Page not found'} | Sankhya Yog Research Center` }, [route])
  let page = route === '' ? <Home /> : route === 'papers' ? <Papers /> : route === 'articles' ? <Articles /> : route === 'about' || route === 'about/founders' ? <About /> : route.startsWith('papers/') ? <PaperDetail slug={route.split('/')[1]} /> : route.startsWith('articles/') ? <ArticleDetail slug={route.split('/')[1]} /> : <NotFound />
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header route={route} /><div id="main-content">{page}</div><Footer /><DeploymentVersion /></>
}

createRoot(document.getElementById('root')).render(<App />)
