import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import BlurText from './components/BlurText.jsx'
import GradientText from './components/GradientText.jsx'
import TextPressure from './components/TextPressure.jsx'

const SEARCH_DATA = [
  { title: 'Azure Container Apps', desc: 'Skalierbare Container ohne Serververwaltung.', tag: 'Compute', score: 0.97 },
  { title: 'Azure OpenAI Service', desc: 'GPT-4, DALL·E und Embeddings in eigenen Apps.', tag: 'KI', score: 0.96 },
  { title: 'Azure AI Search', desc: 'KI-gestützte Suche: Volltext, Vektor, Semantik.', tag: 'KI', score: 0.99 },
  { title: 'Azure Cosmos DB', desc: 'Global verteilte NoSQL-Datenbank, ms-Latenz.', tag: 'Datenbank', score: 0.93 },
  { title: 'Azure Functions', desc: 'Serverless Code – zahle nur was du nutzt.', tag: 'Serverless', score: 0.91 },
  { title: 'Azure Blob Storage', desc: 'Unbegrenzt Dateien und Bilder in der Cloud.', tag: 'Storage', score: 0.88 },
  { title: 'Azure SQL Database', desc: 'Verwaltete relationale DB auf SQL Server Basis.', tag: 'Datenbank', score: 0.92 },
  { title: 'Azure Kubernetes Service', desc: 'Verwaltetes K8s für Container-Workloads.', tag: 'Compute', score: 0.90 },
]

const FEATURES = [
  { icon: '🧠', title: 'Semantisches Reranking', desc: 'ML-Modelle bewerten Ergebnisse nach inhaltlicher Relevanz – nicht nur Stichwörtern.', tag: 'KI' },
  { icon: '📐', title: 'Vektorsuche', desc: 'Embeddings von Azure OpenAI direkt im Index. Ähnlichkeitssuche über alle Datentypen.', tag: 'Embeddings' },
  { icon: '🔀', title: 'Hybrid Search', desc: 'BM25 + Vektorsuche kombiniert mit Reciprocal Rank Fusion (RRF).', tag: 'Fusion' },
  { icon: '⚡', title: 'RAG-Pipelines', desc: 'Koppeln Sie GPT-4 direkt an Ihre Unternehmensdaten für präzise Antworten.', tag: 'GenAI' },
  { icon: '🛡️', title: 'Enterprise Security', desc: 'RBAC, Private Endpoints, CMK – Microsoft Entra ID inklusive.', tag: 'Security' },
  { icon: '⚙️', title: 'KI-Anreicherung', desc: 'Skillsets extrahieren Entitäten und Text aus PDFs und Bildern beim Indizieren.', tag: 'Indexer' },
]

const PIPELINE = [
  { icon: '📦', label: 'Datenquellen', sub: 'Blob · SQL · Cosmos · API' },
  { icon: '⚙️', label: 'Indexer & Skillsets', sub: 'OCR · NER · Chunking · AI' },
  { icon: '🗂️', label: 'Search Index', sub: 'Vektor + Volltext parallel' },
  { icon: '🔎', label: 'Abfrage & RAG', sub: 'Hybrid · Semantic · GPT-4' },
]

const PRICING = [
  { tier: 'Free', price: '0', unit: 'für immer kostenlos', features: ['1 Search Service', '3 Indizes', '50 MB Datenspeicher', 'Volltext-Suche', 'REST API'], featured: false },
  { tier: 'Standard S1', price: '250', unit: 'pro Monat / Search Unit', features: ['50 Indizes', '25 GB Datenspeicher', 'Semantische Suche', 'Vektorsuche', 'KI-Anreicherung', 'SLA 99.9%'], featured: true },
  { tier: 'Storage Optimized', price: '2.000', unit: 'pro Monat / Search Unit', features: ['Bis 2 TB Speicher', 'Dokumenten-Analyse', 'Private Link', 'CMK', 'Priority Support'], featured: false },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const doSearch = useCallback((q = query, tab = activeTab) => {
    if (!q.trim()) { setShowResults(false); return }
    let filtered = SEARCH_DATA.filter(item =>
      item.title.toLowerCase().includes(q.toLowerCase()) ||
      item.desc.toLowerCase().includes(q.toLowerCase()) ||
      item.tag.toLowerCase().includes(q.toLowerCase())
    )
    if (tab !== 'all') filtered = filtered.filter(i => i.tag === tab)
    filtered = filtered
      .map(i => ({ ...i, relevance: i.title.toLowerCase().includes(q.toLowerCase()) ? i.score : i.score * 0.82 }))
      .sort((a, b) => b.relevance - a.relevance)
    setResults(filtered)
    setShowResults(true)
  }, [query, activeTab])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (query) doSearch(query, tab)
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#0a0f1e', minHeight: '100vh', color: 'white' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 15 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#0078d4"/>
            <circle cx="10" cy="10" r="4.5" stroke="#50e6ff" strokeWidth="2"/>
            <line x1="13.5" y1="13.5" x2="19" y2="19" stroke="#50e6ff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Azure AI Search
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Wie es funktioniert', 'Features', 'API', 'Preise'].map(l => (
            <a key={l} href={`#${l}`} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="https://azure.microsoft.com/en-us/products/ai-services/ai-search" target="_blank" rel="noreferrer"
            style={{ padding: '7px 18px', background: '#0078d4', color: 'white', borderRadius: 7, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
            Kostenlos starten
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 40px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,120,212,0.1) 0%, transparent 70%)', top: -100, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(80,230,255,0.1)', border: '1px solid rgba(80,230,255,0.25)', borderRadius: 100, padding: '6px 18px', fontSize: 13, fontWeight: 600, color: '#50e6ff', marginBottom: 32 }}>
          ✦ Microsoft Azure – AI-powered Search
        </motion.div>

        <div style={{ marginBottom: 10 }}>
          <BlurText
            text="Intelligente Suche,"
            delay={80}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
            className="hero-blur"
          />
          <style>{`.hero-blur { font-size: clamp(36px, 7vw, 72px); font-weight: 700; letter-spacing: -2px; line-height: 1.1; color: white; }`}</style>
        </div>

        <div style={{ marginBottom: 32 }}>
          <GradientText colors={['#50e6ff', '#0078d4', '#a259ff', '#50e6ff', '#0078d4']} animationSpeed={4} pauseOnHover>
            <span style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.1 }}>
              die Kontext versteht
            </span>
          </GradientText>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ delay: 0.6 }}
          style={{ fontSize: 18, maxWidth: 520, marginBottom: 40, lineHeight: 1.7, fontWeight: 300 }}>
          Azure AI Search verbindet Datenquellen mit semantischem Retrieval, Vektorsuche und RAG-Pipelines – in einer Plattform.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          style={{ display: 'flex', gap: 14, marginBottom: 52, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://azure.microsoft.com/en-us/products/ai-services/ai-search" target="_blank" rel="noreferrer"
            style={{ padding: '13px 28px', background: '#0078d4', color: 'white', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            ▶ Gratis testen – 250 MB frei
          </a>
          <a href="https://learn.microsoft.com/en-us/azure/search/" target="_blank" rel="noreferrer"
            style={{ padding: '13px 28px', background: 'rgba(255,255,255,0.07)', color: 'white', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Dokumentation lesen
          </a>
        </motion.div>

        {/* Search Widget */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          style={{ width: '100%', maxWidth: 680, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '20px 24px', backdropFilter: 'blur(12px)', position: 'relative' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10, textAlign: 'left' }}>
            Live Demo · Azure AI Search Endpoint
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 15 }}>🔍</span>
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); doSearch(e.target.value, activeTab) }}
                onKeyDown={e => e.key === 'Enter' && doSearch()}
                placeholder='z.B. "Cloud Datenbank", "KI serverless"...'
                style={{ width: '100%', padding: '12px 14px 12px 40px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: 'white', fontSize: 15, outline: 'none' }}
              />
              {showResults && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: '#0f1d2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, overflow: 'hidden', zIndex: 20, boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}>
                  <div style={{ padding: '8px 14px', background: 'rgba(0,120,212,0.12)', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: '#50e6ff', fontWeight: 600, letterSpacing: 1 }}>
                    {results.length} TREFFER · queryType: semantic · vectorSearch: hnsw
                  </div>
                  {results.length === 0
                    ? <div style={{ padding: 20, textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>Keine Ergebnisse für „{query}"</div>
                    : results.slice(0, 5).map((item, i) => (
                      <div key={i} style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'default', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,120,212,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: '#50e6ff' }}>{item.title}</span>
                          <span style={{ fontSize: 11, color: '#27c93f', fontWeight: 600 }}>@score: {item.relevance.toFixed(3)}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{item.desc}</p>
                          <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(0,120,212,0.2)', color: '#50e6ff', borderRadius: 100, whiteSpace: 'nowrap', fontWeight: 600 }}>{item.tag}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <button onClick={() => doSearch()} style={{ padding: '12px 20px', background: '#50e6ff', color: '#003a6c', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Suchen →
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {['all', 'KI', 'Compute', 'Datenbank', 'Storage', 'Serverless'].map(tag => (
              <button key={tag} onClick={() => handleTabChange(tag)}
                style={{ padding: '4px 12px', background: activeTab === tag ? 'rgba(80,230,255,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${activeTab === tag ? '#50e6ff' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, fontSize: 12, color: activeTab === tag ? '#50e6ff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', fontWeight: activeTab === tag ? 600 : 400 }}>
                {tag === 'all' ? 'Alle' : tag}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <div style={{ background: '#060c18', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '32px 40px', display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap' }}>
        {[['99.9%', 'SLA Verfügbarkeit'], ['<100ms', 'Abfragelatenz p99'], ['40+', 'Sprachen'], ['60+', 'Azure Regionen']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: '#50e6ff', lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* TEXT PRESSURE */}
      <section style={{ padding: '72px 40px', background: '#0a0f1e' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#0078d4', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Interaktiv</p>
          <div style={{ height: 110 }}>
            <TextPressure text="AZURE AI SEARCH" textColor="#50e6ff" weight italic flex minFontSize={20} />
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginTop: 12 }}>Bewege die Maus über den Text ↑</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="Wie es funktioniert" style={{ padding: '80px 40px', background: '#060c18' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#0078d4', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Wie es funktioniert</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.5px' }}>Von der Datenquelle zum Suchergebnis</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 500, lineHeight: 1.7, marginBottom: 56 }}>
            Azure AI Search übernimmt den gesamten Weg: einlesen, anreichern, indizieren und semantisch suchen.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative', marginBottom: 56 }}>
            <div style={{ position: 'absolute', top: 31, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg, #0078d4, #50e6ff)', zIndex: 0 }} />
            {PIPELINE.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 12px', position: 'relative', zIndex: 1 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#060c18', border: '2px solid #0078d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>{step.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{step.sub}</div>
              </motion.div>
            ))}
          </div>
          {/* Arch diagram */}
          <div style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '28px 36px' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 24 }}>Architektur</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', alignItems: 'center' }}>
              {[
                { icon: '🗄️', name: 'Ihre Daten', tag: 'Blob / SQL / API' },
                null,
                { icon: '🤖', name: 'Azure OpenAI', tag: 'Embeddings / GPT' },
                null,
                { icon: '🔍', name: 'AI Search Index', tag: 'Vektor + Volltext' },
                null,
                { icon: '📱', name: 'Ihre App', tag: 'REST / SDK' },
              ].map((item, i) =>
                item === null
                  ? <div key={i} style={{ color: '#50e6ff', fontSize: 18, padding: '0 10px', opacity: 0.5, textAlign: 'center' }}>→</div>
                  : <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 26, marginBottom: 7 }}>{item.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 10, color: '#50e6ff', fontWeight: 600 }}>{item.tag}</div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="Features" style={{ padding: '80px 40px', background: '#0a0f1e' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#0078d4', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Kernfunktionen</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, marginBottom: 48, letterSpacing: '-0.5px' }}>Alles, was moderne Suche braucht</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 26, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,120,212,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none' }}>
                <div style={{ fontSize: 26, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 9 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 12 }}>{f.desc}</div>
                <span style={{ fontSize: 11, padding: '3px 10px', background: 'rgba(0,120,212,0.12)', color: '#50e6ff', borderRadius: 100, fontWeight: 600 }}>{f.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API CODE */}
      <section id="API" style={{ padding: '80px 40px', background: '#060c18' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#0078d4', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Entwickler-API</p>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, marginBottom: 14, letterSpacing: '-0.5px' }}>In 5 Minuten integriert</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 36 }}>Echter REST-Endpoint, SDKs für Python, .NET, Java und JavaScript.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {[
                ['🔑', 'API-Key oder Managed Identity', 'Für schnellen Start per API-Key, oder produktionsreif per Entra ID ohne Secrets.'],
                ['📡', 'Echter REST-Endpoint', 'Jeder Service erhält einen eigenen HTTPS-Endpoint direkt auf Microsofts Infrastruktur.'],
                ['📈', '@search.score & Captions', 'Jedes Ergebnis liefert Relevanz-Score und semantische Captions für transparentes Ranking.'],
              ].map(([ic, t, d]) => (
                <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, minWidth: 36, background: 'rgba(0,120,212,0.12)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{ic}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{t}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#0f1117', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 18px', background: '#16202e', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ff5f56','#ffbd2e','#27c93f'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'block' }} />)}
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>POST /indexes/products/docs/search</span>
            </div>
            <pre style={{ padding: 20, fontSize: 12, lineHeight: 1.8, margin: 0, overflowX: 'auto', fontFamily: "'Cascadia Code','Fira Code',monospace", color: 'rgba(255,255,255,0.8)' }}>
{`// Hybrid: Volltext + Vektor + Semantik
const response = await fetch(
  \`https://\${service}.search.windows.net
    /indexes/products/docs/search\`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.AZURE_KEY
    },
    body: JSON.stringify({
      search: "Cloud Datenbank",
      queryType: "semantic",
      semanticConfiguration: "my-config",
      vectorQueries: [{
        kind: "text",
        text: "Cloud Datenbank",
        fields: "embedding",
        k: 5
      }],
      top: 5
    })
  }
);

// → Semantisch geranktes Ergebnis-Array`}
            </pre>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="Preise" style={{ padding: '80px 40px', background: '#0a0f1e' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#0078d4', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, textAlign: 'center' }}>Preismodell</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, marginBottom: 48, letterSpacing: '-0.5px', textAlign: 'center' }}>Skaliert mit Ihrer Nutzung</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {PRICING.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: plan.featured ? 'rgba(0,120,212,0.07)' : 'rgba(255,255,255,0.02)', border: `1px solid ${plan.featured ? 'rgba(0,120,212,0.45)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 14, padding: '28px 24px', position: 'relative', transform: plan.featured ? 'scale(1.03)' : 'none' }}>
                {plan.featured && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#0078d4', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 14px', borderRadius: 100, whiteSpace: 'nowrap' }}>Empfohlen</div>}
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{plan.tier}</div>
                <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1, marginBottom: 3 }}><sup style={{ fontSize: 18, verticalAlign: 'super' }}>$</sup>{plan.price}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 22 }}>{plan.unit}</div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 9 }}>
                      <span style={{ width: 17, height: 17, minWidth: 17, background: 'rgba(0,120,212,0.18)', color: '#50e6ff', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://azure.microsoft.com/en-us/products/ai-services/ai-search" target="_blank" rel="noreferrer"
                  style={{ display: 'block', width: '100%', padding: '10px 0', background: plan.featured ? '#0078d4' : 'rgba(255,255,255,0.05)', color: 'white', border: `1px solid ${plan.featured ? '#0078d4' : 'rgba(255,255,255,0.1)'}`, borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
                  {plan.price === '0' ? 'Gratis starten' : plan.featured ? 'Jetzt starten' : 'Kontakt'}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: 'linear-gradient(135deg, #003a6c 0%, #0078d4 60%, #1a0050 100%)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.5px' }}>Bereit für echte KI-Suche?</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 460, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Ersten Azure AI Search Index in unter 10 Minuten einrichten – direkt im Azure Portal.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://portal.azure.com" target="_blank" rel="noreferrer"
            style={{ padding: '14px 28px', background: 'white', color: '#003a6c', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            Im Azure Portal öffnen
          </a>
          <a href="https://learn.microsoft.com/en-us/azure/search/search-get-started-portal" target="_blank" rel="noreferrer"
            style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.28)', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
            Quickstart ansehen
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#060a12', padding: '48px 40px 28px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#0078d4"/><circle cx="10" cy="10" r="4.5" stroke="#50e6ff" strokeWidth="2"/><line x1="13.5" y1="13.5" x2="19" y2="19" stroke="#50e6ff" strokeWidth="2" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Azure AI Search</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, maxWidth: 240 }}>KI-gestützte Suchinfrastruktur von Microsoft Azure. Skalierbar, sicher, sofort einsatzbereit.</p>
          </div>
          {[
            ['Produkt', ['Übersicht', 'Features', 'Preise', 'SLA', 'Regionen']],
            ['Entwickler', ['Quickstart', 'REST API Ref', 'Python SDK', '.NET SDK', 'GitHub']],
            ['Microsoft', ['Azure Portal', 'Azure OpenAI', 'MS Learn', 'Datenschutz', 'AGB']],
          ].map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {links.map(l => <li key={l}><a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          <span>© 2025 Microsoft Corporation. Alle Rechte vorbehalten.</span>
          <span>🪟 Microsoft Azure</span>
        </div>
      </footer>
    </div>
  )
}
