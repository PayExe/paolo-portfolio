import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import translations from './i18n.json'
import './App.css'

/* ───────── helpers ───────── */
function t(lang, key) {
  return translations[lang]?.[key] ?? key
}

/* ───────── useActiveSection hook ───────── */
function useActiveSection(sectionIds) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return active
}

/* ───────── Page Transition Overlay ───────── */
function PageTransition({ active }) {
  return (
    <div className={`page-transition-overlay ${active ? 'active' : ''}`} />
  )
}

/* ───────── Navbar ───────── */
function Navbar({ lang, setLang, theme, setTheme, activeSection, onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#about', id: 'about', label: lang === 'fr' ? 'A propos' : 'About' },
    { href: '#projects', id: 'projects', label: lang === 'fr' ? 'Projets' : 'Projects' },
    { href: '#education', id: 'education', label: lang === 'fr' ? 'Formation' : 'Education' },
    { href: '#contact', id: 'contact', label: 'Contact' },
  ]

  const handleClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    onNavClick(href)
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="#" className="brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          Paolo<span className="dot">.</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${activeSection === l.id ? 'active' : ''}`}
              onClick={(e) => handleClick(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button className="lang-toggle" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <button className={`burger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ───────── Hero ───────── */
function Hero({ lang }) {
  return (
    <section className="hero" id="about">
      <div className="hero-grid">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-label">{t(lang, 'hero_label')}</span>
          <h1>{t(lang, 'hero_title')}</h1>
          <p className="hero-desc">{t(lang, 'hero_desc')}</p>
          <div className="hero-btns">
            <a href="#projects" className="btn-primary">{t(lang, 'hero_btn_projects')}</a>
            <a href="#contact" className="btn-outline">{t(lang, 'hero_btn_contact')}</a>
          </div>
        </motion.div>

        <motion.div
          className="hero-photo-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hero-photo-border" />
          <img src="/images/pay.jpg" alt="Paolo Antonini" className="hero-photo" />
        </motion.div>
      </div>
    </section>
  )
}

/* ───────── Projects ───────── */
const allProjects = [
  {
    id: 'osadeo',
    category: 'perso',
    date: { fr: 'Nov 2025', en: 'Nov 2025' },
    title: 'Osadeo Studio',
    desc: {
      fr: "Studio de développement que j'ai fondé, regroupant plusieurs projets open-source.",
      en: 'Development studio I founded, grouping several open-source projects.',
    },
    tags: ['Organization', 'Open Source'],
    link: 'https://github.com/osadeo-studio',
  },
  {
    id: 'bhost',
    category: 'perso',
    date: { fr: 'Nov 2025', en: 'Nov 2025' },
    title: 'BHOST',
    desc: {
      fr: 'Outil CLI pour gérer et déployer des serveurs facilement depuis le terminal.',
      en: 'CLI tool to manage and deploy servers easily from the terminal.',
    },
    tags: ['Golang', 'CLI', 'DevOps'],
    link: 'https://github.com/osadeo-studio/BHOST',
    inProgress: true,
  },
  {
    id: 'nswebsite',
    category: 'perso',
    date: { fr: 'Sept 2025', en: 'Sep 2025' },
    title: 'NS Website',
    desc: {
      fr: "Site vitrine pour mon meilleur pote qui fait de la musique. Design moderne, animations smooth.",
      en: 'Showcase website for my best friend who makes music. Modern design, smooth animations.',
    },
    tags: ['React', 'Framer Motion', 'Tailwind'],
    link: 'https://github.com/PayExe/NSWEBSITE',
  },
  {
    id: 'steamy',
    category: 'perso',
    date: { fr: 'Juil 2025', en: 'Jul 2025' },
    title: 'Steamy',
    desc: {
      fr: "Clone de Steam en desktop app avec Electron. Interface fidèle, gestion de bibliothèque.",
      en: 'Steam clone as a desktop app with Electron. Faithful UI, library management.',
    },
    tags: ['Electron', 'JavaScript', 'CSS'],
    link: 'https://github.com/PayExe/Steamy',
    inProgress: true,
  },
  {
    id: 'power4',
    category: 'school',
    date: { fr: '2025', en: '2025' },
    title: 'Power 4',
    desc: {
      fr: "Puissance 4 en ligne de commande en C. Projet de 1ère année à Ynov.",
      en: 'Connect 4 in command line in C. First year project at Ynov.',
    },
    tags: ['C', 'Terminal'],
    link: 'https://ytrack.learn.ynov.com/git/gvincent/Power4.git',
  },
  {
    id: 'gigamania',
    category: 'school',
    date: { fr: '2025', en: '2025' },
    title: 'Giga Mania',
    desc: {
      fr: "Site e-commerce de jeux vidéo en PHP orienté objet. Projet de 1ère année.",
      en: 'Video game e-commerce site in object-oriented PHP. First year project.',
    },
    tags: ['PHP', 'OOP', 'MySQL'],
    link: 'https://github.com/SkyVence/poo-game-shop',
  },
]

function Projects({ lang }) {
  const [filter, setFilter] = useState('all')

  const filters = [
    { key: 'all', label: lang === 'fr' ? 'Tout' : 'All' },
    { key: 'perso', label: lang === 'fr' ? 'Perso' : 'Personal' },
    { key: 'school', label: lang === 'fr' ? 'Scolaire' : 'School' },
  ]

  const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter)

  return (
    <section className="projects-section" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t(lang, 'projects_label')}</span>
        <h2 className="section-title">{t(lang, 'projects_title')}</h2>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="project-filters"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {filters.map(f => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="timeline">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              className="timeline-item"
              key={p.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-date">{p.date[lang]}</span>
                <h3>
                  {p.title}
                  {p.inProgress && (
                    <span className="badge-progress">{lang === 'fr' ? 'En cours' : 'In progress'}</span>
                  )}
                  {p.category === 'school' && (
                    <span className="badge-school">{lang === 'fr' ? 'Ynov' : 'Ynov'}</span>
                  )}
                </h3>
                <p>{p.desc[lang]}</p>
                <div className="tag-row">
                  {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  {t(lang, 'view_project')} →
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ───────── Education ───────── */
function Education({ lang }) {
  const items = [
    {
      school: 'Ynov Campus Bordeaux',
      period: { fr: '2025 – present', en: '2025 – present' },
      degree: { fr: "Bachelor Informatique – 1ère année", en: 'Bachelor Computer Science – 1st year' },
      desc: {
        fr: "Formation en développement web, cybersécurité et intelligence artificielle. Projets pratiques en C, PHP et plus.",
        en: 'Training in web development, cybersecurity and artificial intelligence. Hands-on projects in C, PHP and more.',
      },
    },
    {
      school: { fr: 'Lycée (Terminale)', en: 'High School (Senior Year)' },
      period: { fr: '2024 – 2025', en: '2024 – 2025' },
      degree: { fr: 'Baccalauréat – Spé NSI & Maths', en: 'Baccalauréat – CS & Maths majors' },
      desc: {
        fr: "Spécialités NSI et Mathématiques. Premiers projets en Python, découverte du développement web en autodidacte.",
        en: 'NSI and Mathematics majors. First Python projects, self-taught web development discovery.',
      },
    },
  ]

  return (
    <section className="education-section" id="education">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t(lang, 'education_label')}</span>
        <h2 className="section-title">{t(lang, 'education_title')}</h2>
      </motion.div>

      <div className="edu-cards">
        {items.map((item, i) => (
          <motion.div
            className="edu-card"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <span className="edu-period">{typeof item.period === 'string' ? item.period : item.period[lang]}</span>
            <h3>{typeof item.school === 'string' ? item.school : item.school[lang]}</h3>
            <h4 className="edu-degree">{typeof item.degree === 'string' ? item.degree : item.degree[lang]}</h4>
            <p>{typeof item.desc === 'string' ? item.desc : item.desc[lang]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ───────── Contact ───────── */
function Contact({ lang }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.elements['name'].value
    const email = form.elements['email'].value
    const message = form.elements['message'].value
    const subject = lang === 'fr' ? 'Contact depuis le portfolio' : 'Contact from portfolio'
    const body = `${lang === 'fr' ? 'Nom' : 'Name'}: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`
    window.location.href = `mailto:paolo.antonini.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
  }

  return (
    <section className="contact-section" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t(lang, 'contact_label')}</span>
        <h2 className="section-title">{t(lang, 'contact_title')}</h2>
        <p className="contact-desc">{t(lang, 'contact_desc')}</p>
      </motion.div>

      <div className="contact-grid">
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <input type="text" name="name" placeholder={t(lang, 'form_name')} required />
          <input type="email" name="email" placeholder={t(lang, 'form_email')} required />
          <textarea name="message" rows="5" placeholder={t(lang, 'form_message')} required />
          <button type="submit" className="btn-primary">{t(lang, 'form_send')}</button>
        </motion.form>

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="info-box">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h4>Email</h4>
              <a href="mailto:paolo.antonini.dev@gmail.com">paolo.antonini.dev@gmail.com</a>
            </div>
          </div>
          <div className="info-box">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <h4>{t(lang, 'location')}</h4>
              <p>Bordeaux, France</p>
            </div>
          </div>
          <div className="social-row">
            <a href="https://github.com/PayExe" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/paolo-antonini-579910383/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────── Legal Modal ───────── */
function LegalModal({ open, onClose, lang }) {
  const overlayRef = useRef()

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="legal-overlay"
          ref={overlayRef}
          onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="legal-modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            <button className="legal-close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2>{t(lang, 'legal_title')}</h2>

            <div className="legal-section">
              <h3>{t(lang, 'legal_editor_title')}</h3>
              <p>{t(lang, 'legal_editor_text')}</p>
            </div>

            <div className="legal-section">
              <h3>{t(lang, 'legal_host_title')}</h3>
              <p>{t(lang, 'legal_host_text')}</p>
            </div>

            <div className="legal-section">
              <h3>{t(lang, 'legal_data_title')}</h3>
              <p>{t(lang, 'legal_data_text')}</p>
            </div>

            <div className="legal-section">
              <h3>{t(lang, 'legal_ip_title')}</h3>
              <p>{t(lang, 'legal_ip_text')}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ───────── App ───────── */
const sectionIds = ['about', 'projects', 'education', 'contact']

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'fr')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [legalOpen, setLegalOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const handleNavClick = useCallback((href) => {
    const targetId = href.replace('#', '')
    const el = document.getElementById(targetId)
    if (!el) return

    setTransitioning(true)
    setTimeout(() => {
      const top = el.offsetTop - 80
      window.scrollTo({ top, behavior: 'instant' })
      setTimeout(() => setTransitioning(false), 150)
    }, 300)
  }, [])

  return (
    <>
      <PageTransition active={transitioning} />
      <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} activeSection={activeSection} onNavClick={handleNavClick} />
      <main>
        <Hero lang={lang} />
        <Projects lang={lang} />
        <Education lang={lang} />
        <Contact lang={lang} />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <p>&copy; {new Date().getFullYear()} Paolo Antonini</p>
          <button className="footer-legal" onClick={() => setLegalOpen(true)}>
            {t(lang, 'legal_link')}
          </button>
        </div>
      </footer>
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} lang={lang} />
    </>
  )
}
