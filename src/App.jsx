import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import translations from './i18n.json'
import './App.css'

function t(lang, key) {
  return translations[lang]?.[key] ?? key
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
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

const CODE_LEFT = [
  "import { useState,",
  "  useEffect,",
  "  useRef,",
  "  useCallback } from 'react'",
  "import { motion,",
  "  AnimatePresence }",
  "  from 'framer-motion'",
  "import translations",
  "  from './i18n.json'",
  "function t(lang, key) {",
  "  return translations",
  "    [lang]?.[key] ?? key",
  "}",
  "const [lang, setLang] =",
  "  useState(() =>",
  "    localStorage.getItem('lang')",
  "    || 'fr')",
  "const [theme, setTheme] =",
  "  useState(() =>",
  "    localStorage.getItem('theme')",
  "    || 'dark')",
  "useEffect(() => {",
  "  document.documentElement",
  "    .setAttribute(",
  "      'data-theme', theme)",
  "  localStorage",
  "    .setItem('theme', theme)",
  "}, [theme])",
  "useEffect(() => {",
  "  localStorage",
  "    .setItem('lang', lang)",
  "}, [lang])",
  "const activeSection =",
  "  useActiveSection(sectionIds)",
  "const handleNavClick =",
  "  useCallback((href) => {",
  "    const targetId =",
  "      href.replace('#', '')",
  "    const el =",
  "      document.getElementById(",
  "        targetId)",
  "    if (!el) return",
  "    setTransitioning(true)",
  "    setTimeout(() => {",
  "      window.scrollTo({",
  "        top: el.offsetTop - 80,",
  "        behavior: 'instant'",
  "      })",
  "      setTimeout(() =>",
  "        setTransitioning(false)",
  "      , 150)",
  "    }, 300)",
  "  }, [])",
  "const handleSubmit = (e) => {",
  "  e.preventDefault()",
  "  const form = e.target",
  "  const name =",
  "    form.elements['name'].value",
  "  const email =",
  "    form.elements['email'].value",
  "  const subject =",
  "    form.elements['subject'].value",
  "  const message =",
  "    form.elements['message'].value",
  "  window.location.href =",
  "    `mailto:paolo.antonini",
  "      .dev@gmail.com",
  "      ?subject=${subject}",
  "      &body=${body}`",
  "}",
]

const CODE_RIGHT = [
  "function useActiveSection(ids) {",
  "  const [active, setActive]",
  "    = useState('')",
  "  useEffect(() => {",
  "    const obs =",
  "      new IntersectionObserver(",
  "        (entries) => {",
  "          entries.forEach(e => {",
  "            if (e.isIntersecting)",
  "              setActive(",
  "                e.target.id)",
  "          })",
  "        },",
  "        { rootMargin:",
  "          '-50% 0px -50% 0px'",
  "        }",
  "      )",
  "    ids.forEach(id => {",
  "      const el =",
  "        document",
  "          .getElementById(id)",
  "      if (el) obs.observe(el)",
  "    })",
  "    return () =>",
  "      obs.disconnect()",
  "  }, [ids])",
  "  return active",
  "}",
  "const sectionIds = [",
  "  'about',",
  "  'projects',",
  "  'education',",
  "  'contact',",
  "]",
  "export default function App() {",
  "  return (",
  "    <>",
  "      <HsrBg />",
  "      <PageTransition",
  "        active={transitioning}",
  "      />",
  "      <Navbar",
  "        lang={lang}",
  "        setLang={setLang}",
  "        theme={theme}",
  "        setTheme={setTheme}",
  "        activeSection={activeSection}",
  "        onNavClick={handleNavClick}",
  "      />",
  "      <main>",
  "        <Hero lang={lang} />",
  "        <SectionDivider />",
  "        <Projects lang={lang} />",
  "        <SectionDivider />",
  "        <Education lang={lang} />",
  "        <SectionDivider />",
  "        <Contact lang={lang} />",
  "      </main>",
  "      <footer>",
  "        <span>Paolo<span>.</span>",
  "        </span>",
  "        <p>&copy; {new Date()",
  "          .getFullYear()}",
  "          Paolo Antonini</p>",
  "      </footer>",
  "    </>",
  "  )",
  "}",
]

function HsrBg() {
  return (
    <div className="hsr-bg" aria-hidden="true">
      <div className="code-col code-col-left">
        <div className="code-col-inner">
          {[...CODE_LEFT, ...CODE_LEFT].map((line, i) => (
            <span key={`code-left-${i}`} className="code-line">{line}</span>
          ))}
        </div>
      </div>
      <div className="code-col code-col-right">
        <div className="code-col-inner code-col-inner--reverse">
          {[...CODE_RIGHT, ...CODE_RIGHT].map((line, i) => (
            <span key={`code-right-${i}`} className="code-line">{line}</span>
          ))}
        </div>
      </div>

    </div>
  )
}

function PageTransition({ active }) {
  return (
    <div className={`page-transition-overlay ${active ? 'active' : ''}`} />
  )
}

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <svg className="divider-arm divider-arm-left" viewBox="0 0 400 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
        <path d="M0 16 L320 16 C340 16 355 12 370 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M240 16 L340 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" transform="translate(0 -4)"/>
        <path d="M240 16 L340 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" transform="translate(0 4)"/>
        <path d="M370 16 L390 9 L400 16 L390 23 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M378 16 L392 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <path d="M48 16 L48 9 M44 12.5 L52 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M80 16 L80 9 M76 12.5 L84 12.5" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" opacity="0.35"/>
        <path d="M116 16 L116 10 M112 13 L120 13" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.25"/>
      </svg>

      <svg className="divider-center" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 3 L61 16 L40 29 L19 16 Z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M40 9 L53 16 L40 23 L27 16 Z" stroke="currentColor" strokeWidth="1.0" fill="none" opacity="0.55"/>
        <circle cx="40" cy="16" r="2.5" fill="currentColor" opacity="0.9"/>
        <path d="M40 3 L40 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M40 29 L40 32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M61 16 L64 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M19 16 L16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M33 9 L29 5" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" opacity="0.5"/>
        <path d="M47 9 L51 5" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" opacity="0.5"/>
        <path d="M33 23 L29 27" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" opacity="0.5"/>
        <path d="M47 23 L51 27" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" opacity="0.5"/>
      </svg>

      <svg className="divider-arm divider-arm-right" viewBox="0 0 400 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet">
        <path d="M400 16 L80 16 C60 16 45 12 30 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M160 16 L60 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" transform="translate(0 -4)"/>
        <path d="M160 16 L60 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" transform="translate(0 4)"/>
        <path d="M30 16 L10 9 L0 16 L10 23 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M22 16 L8 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <path d="M352 16 L352 9 M348 12.5 L356 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M320 16 L320 9 M316 12.5 L324 12.5" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" opacity="0.35"/>
        <path d="M284 16 L284 10 M280 13 L288 13" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.25"/>
      </svg>
    </div>
  )
}

function Navbar({ lang, setLang, theme, setTheme, activeSection, onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#about',     id: 'about',     label: lang === 'fr' ? 'A propos'  : 'About'     },
    { href: '#projects',  id: 'projects',  label: lang === 'fr' ? 'Projets'   : 'Projects'  },
    { href: '#education', id: 'education', label: lang === 'fr' ? 'Formation' : 'Education' },
    { href: '#contact',   id: 'contact',   label: 'Contact'                                  },
  ]

  const handleClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    onNavClick(href)
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a
          href="#"
          className="brand"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
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
          <button className="nav-toggle-btn" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} aria-label="Toggle language">
            <span className="lang-label">{lang === 'fr' ? 'EN' : 'FR'}</span>
          </button>
          <button className="nav-toggle-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="17" height="17">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="17" height="17">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
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

function Hero({ lang }) {
  return (
    <section className="hero" id="about">
      <div className="hero-grid">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>
            Paolo<br />
            <span className="hero-name-highlight">Antonini</span>
          </h1>
          <p className="hero-subtitle">{t(lang, 'hero_subtitle')}</p>
          <p className="hero-desc">{t(lang, 'hero_desc')}</p>
          <div className="hero-btns">
            <a href="#projects" className="btn-primary">{t(lang, 'hero_btn_projects')}</a>
            <a href="#contact" className="btn-outline">{t(lang, 'hero_btn_contact')}</a>
          </div>
        </motion.div>

        <motion.div
          className="hero-photo-wrapper"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg className="photo-frame-svg" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8 64 L8 8 L64 8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
            <path d="M272 64 L272 8 L216 8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
            <path d="M8 216 L8 272 L64 272" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
            <path d="M272 216 L272 272 L216 272" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
            <path d="M16 52 L16 16 L52 16" stroke="currentColor" strokeWidth="0.8" strokeLinecap="square" opacity="0.4"/>
            <path d="M264 52 L264 16 L228 16" stroke="currentColor" strokeWidth="0.8" strokeLinecap="square" opacity="0.4"/>
            <path d="M16 228 L16 264 L52 264" stroke="currentColor" strokeWidth="0.8" strokeLinecap="square" opacity="0.4"/>
            <path d="M264 228 L264 264 L228 264" stroke="currentColor" strokeWidth="0.8" strokeLinecap="square" opacity="0.4"/>
            <path d="M8 8 L13 13 L8 18 L3 13 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M272 8 L277 13 L272 18 L267 13 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M8 272 L13 267 L8 262 L3 267 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M272 272 L277 267 L272 262 L267 267 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
            <line x1="124" y1="8" x2="156" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
            <path d="M140 4 L144 8 L140 12 L136 8 Z" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.6"/>
            <line x1="124" y1="272" x2="  156" y2="272" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
            <path d="M140 268 L144 272 L140 276 L136 272 Z" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.6"/>
            <line x1="8" y1="124" x2="8" y2="156" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
            <path d="M4 140 L8 136 L12 140 L8 144 Z" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.6"/>
            <line x1="272" y1="124" x2="272" y2="156" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
            <path d="M268 140 L272 136 L276 140 L272 144 Z" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.6"/>
            <line x1="32" y1="8" x2="32" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
            <line x1="46" y1="8" x2="46" y2="13" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
            <line x1="8" y1="32" x2="14" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
            <line x1="8" y1="46" x2="13" y2="46" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
            <line x1="248" y1="8" x2="248" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
            <line x1="234" y1="8" x2="234" y2="13" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
            <line x1="272" y1="32" x2="266" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
            <line x1="272" y1="46" x2="267" y2="46" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
            <line x1="32" y1="272" x2="32" y2="266" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
            <line x1="46" y1="272" x2="46" y2="267" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
            <line x1="8" y1="248" x2="14" y2="248" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
            <line x1="8" y1="234" x2="13" y2="234" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
            <line x1="248" y1="272" x2="248" y2="266" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
            <line x1="234" y1="272" x2="234" y2="267" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
            <line x1="272" y1="248" x2="266" y2="248" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
            <line x1="272" y1="234" x2="267" y2="234" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
          </svg>

          <img src="/images/P.png" alt="Paolo Antonini" className="hero-photo" />
        </motion.div>
      </div>
    </section>
  )
}

const personalProjects = [
  {
    id: 'osadeo',
    date: { fr: 'Nov 2025', en: 'Nov 2025' },
    title: 'Osadeo Studio',
    desc: {
      fr: "Osadeo Studio c'est un studio indépendant de jeux vidéo créé entre amis, par passion. On travaille actuellement sur notre premier jeu sous Godot. C'est un projet long terme qui nous tient vraiment à coeur.",
      en: "Osadeo Studio is an independent video game studio created between friends, out of passion. We're currently working on our first game in Godot. It's a long-term project we really care about.",
    },
    tags: ['Groupe', 'Studio Indé', 'Game Dev'],
    link: 'https://osadeo.com/',
  },
  {
    id: 'bhost',
    date: { fr: 'Nov 2025', en: 'Nov 2025' },
    title: 'BHOST',
    desc: {
      fr: "Un jeu développé sous Godot dans le cadre d'Osadeo Studio. BHOST c'est une chasse aux fantômes... pas comme les autres. Un concept original qu'on développe à plusieurs, mêlant exploration et gameplay unique.",
      en: "A game developed in Godot as part of Osadeo Studio. BHOST is a ghost hunt... unlike any other. An original concept mixing exploration and unique gameplay.",
    },
    tags: ['Godot', 'GDScript', 'Multiplayer'],
    link: 'https://github.com/osadeo-studio',
    inProgress: true,
  },
  {
    id: 'nswebsite',
    date: { fr: 'Sept 2025', en: 'Sep 2025' },
    title: 'NS Website',
    desc: {
      fr: "Site que j'ai créé pour mon meilleur ami, artiste du label NS!! Records. Fait à l'origine comme cadeau d'anniversaire, le but c'était de mettre en avant son univers musical avec un design dark, des animations de terminal et une DA rétro choisie par l'artiste lui-même.",
      en: "Website I created for my best friend, artist of the NS!! Records label. Originally a birthday gift — dark design, terminal animations and retro art direction chosen by the artist himself.",
    },
    tags: ['Web', 'HTML/CSS', 'JS'],
    link: 'https://github.com/PayExe/NSWEBSITE',
  },
  {
    id: 'steamy',
    date: { fr: 'Juil 2025', en: 'Jul 2025' },
    title: 'Steamy',
    desc: {
      fr: "Steamy est un bot Discord qui permet de créer et gérer une wishlist de jeux Steam. Il analyse régulièrement les promotions et notifie les utilisateurs lorsque les jeux suivis passent en réduction. Le projet inclut également plusieurs fonctionnalités supplémentaires pour améliorer l'expérience utilisateur.",
      en: "Discord bot connecting my server to Steam. Personal wishlist, game search, detailed info with prices and reviews, random game, autocomplete, channel restriction and anti-spam. My first real personal JS project.",
    },
    tags: ['Discord.js', 'Node.js', 'Steam API'],
    link: 'https://github.com/PayExe/Steamy',
    inProgress: true,
  },
]

const schoolProjects = [
  {
    id: 'power4',
    title: 'Power 4',
    desc: {
      fr: "Puissance 4 jouable sur une interface web, avec un backend en Go. Projet réalisé en première année à Ynov.",
      en: 'Connect 4 playable on a web interface, with a Go backend. First year project at Ynov.',
    },
    tags: ['Go', 'Web'],
    link: 'https://ytrack.learn.ynov.com/git/gvincent/Power4.git',
  },
  {
    id: 'gigamania',
    title: 'Giga Mania',
    desc: {
      fr: "Application e-commerce de jeux vidéo en Java orienté objet et JavaFX avec gestion de panier et base de données. Projet de groupe en première année.",
      en: 'Video game e-commerce application in OOP Java and JavaFX with cart management and database. Group project in first year.',
    },
    tags: ['Java', 'JavaFX'],
    link: 'https://github.com/SkyVence/poo-game-shop',
  },
]

function Projects({ lang }) {
  return (
    <section className="projects-section" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-label">{t(lang, 'projects_label')}</span>
        <h2 className="section-title">{t(lang, 'projects_title')}</h2>
      </motion.div>

      <div className="projects-timeline">
        <div className="timeline-vine-wrapper" aria-hidden="true">
          <div className="timeline-vine" />
        </div>

        {personalProjects.map((p, i) => (
          <motion.div
            className="project-item"
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="project-date-col">
              <span className="project-date">{p.date[lang]}</span>
            </div>
            <div className="project-line">
              <div className="project-dot" />
            </div>
            <div className="project-card">
              <h3>
                {p.title}
                {p.inProgress && (
                  <span className="badge-progress">{lang === 'fr' ? 'En cours' : 'In progress'}</span>
                )}
              </h3>
              <p>{p.desc[lang]}</p>
              <div className="tag-row">
                {p.tags.map((tag, idx) => <span key={`${p.id}-tag-${idx}`} className="tag">{tag}</span>)}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
                {t(lang, 'view_project')}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="school-projects-header"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <h3 className="school-projects-title">
          {lang === 'fr' ? 'Projets scolaires' : 'School Projects'}
          <span className="badge-school">Ynov</span>
        </h3>
        <p className="school-projects-desc">
          {lang === 'fr'
            ? "Projets réalisés dans le cadre de ma première année à Ynov Campus Bordeaux."
            : 'Projects completed during my first year at Ynov Campus Bordeaux.'}
        </p>
      </motion.div>

      <div className="school-projects-grid">
        {schoolProjects.map((p, i) => (
          <motion.div
            className="school-card"
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4>{p.title}</h4>
            <p>{p.desc[lang]}</p>
            <div className="tag-row">
              {p.tags.map((tag, idx) => <span key={`school-${p.id}-tag-${idx}`} className="tag">{tag}</span>)}
            </div>
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
              {t(lang, 'view_repo')}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Education({ lang }) {
  const items = [
    {
      school: 'Ynov Campus Bordeaux',
      period: { fr: '2025 – aujourd\'hui', en: '2025 – present' },
      degree: { fr: "Bachelor Informatique — 1ère année", en: "Bachelor's Computer Science — 1st year" },
      desc: {
        fr: "Le vrai début de l'aventure. Développement web, bases de données, programmation orientée objet, réseaux... C'est ici que je structure tout ce que j'ai appris en autodidacte et que je découvre de nouveaux domaines comme la cybersécurité et l'IA.",
        en: "The real start of the adventure. Web development, databases, object-oriented programming, networking... This is where I structure everything I self-taught and discover new fields like cybersecurity and AI.",
      },
      coursework: {
        fr: 'Web, Base de données, POO, Réseaux, Software Engineering',
        en: 'Web, Database, OOP, Networking, Software Engineering',
      },
    },
    {
      school: { fr: 'Lycée', en: 'High School' },
      period: { fr: '2022 – 2025', en: '2022 – 2025' },
      degree: { fr: "Baccalauréat — Spécialités NSI & Mathématiques", en: "Baccalauréat — NSI & Mathematics" },
      desc: {
        fr: "Le début d'une passion. C'est au lycée que j'ai découvert la programmation avec Python en NSI et que j'ai commencé à apprendre le développement web en autodidacte à côté. C'est là que j'ai su que je voulais en faire mon métier.",
        en: "Where it all started. High school is where I discovered programming with Python in NSI and started learning web development on my own. That's when I knew I wanted to make it my career.",
      },
      coursework: {
        fr: 'NSI (Python, Algo, Réseaux), Mathématiques',
        en: 'NSI (Python, Algorithms, Networking), Mathematics',
      },
    },
  ]

  return (
    <section className="education-section" id="education">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-label">{t(lang, 'education_label')}</span>
        <h2 className="section-title">{t(lang, 'education_title')}</h2>
      </motion.div>

      <div className="edu-stack">
        {items.map((item, i) => (
          <motion.div
            className="edu-card"
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="edu-card-header">
              <div>
                <h3>{typeof item.school === 'string' ? item.school : item.school[lang]}</h3>
                <p className="edu-degree">{typeof item.degree === 'string' ? item.degree : item.degree[lang]}</p>
              </div>
              <span className="edu-period">{typeof item.period === 'string' ? item.period : item.period[lang]}</span>
            </div>
            <p className="edu-desc">{typeof item.desc === 'string' ? item.desc : item.desc[lang]}</p>
            <p className="edu-coursework">{lang === 'fr' ? 'Matières : ' : 'Coursework: '}{item.coursework[lang]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Email validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// Sanitize input to prevent email header injection
const sanitizeForEmail = (input) => {
  return input
    .replace(/[\r\n]/g, ' ')  // Remove line breaks
    .replace(/[\x00-\x1F]/g, '') // Remove control characters
    .trim()
}

function Contact({ lang }) {
  const [emailError, setEmailError] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = sanitizeForEmail(form.elements['name'].value).substring(0, 100)
    const email = sanitizeForEmail(form.elements['email'].value).substring(0, 254)
    const subject = sanitizeForEmail(form.elements['subject'].value).substring(0, 100)
    const message = sanitizeForEmail(form.elements['message'].value).substring(0, 5000)
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError(true)
      setTimeout(() => setEmailError(false), 3000)
      return
    }
    
    // Construct email body with proper encoding
    const body = `${lang === 'fr' ? 'Nom' : 'Name'}: ${name}\nEmail: ${email}\n\n${message}`
    const contactEmail = typeof __VITE_CONTACT_EMAIL__ !== 'undefined' ? __VITE_CONTACT_EMAIL__ : 'paolo.antonini.dev@gmail.com'
    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    setSubmitAttempted(true)
    window.location.href = mailtoLink
    
    // Reset after 5 seconds
    setTimeout(() => setSubmitAttempted(false), 5000)
  }

  return (
    <section className="contact-section" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-label">{t(lang, 'contact_label')}</span>
        <h2 className="section-title">{t(lang, 'contact_title')}</h2>
      </motion.div>

      <div className="contact-grid">
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="form-group">
            <label htmlFor="name">{t(lang, 'form_name')}</label>
            <input type="text" id="name" name="name" placeholder={t(lang, 'form_name_placeholder')} required />
          </div>
           <div className="form-group">
             <label htmlFor="email">
               Email
               {emailError && <span className="form-error">{lang === 'fr' ? 'Email invalide' : 'Invalid email'}</span>}
             </label>
             <input 
               type="email" 
               id="email" 
               name="email" 
               placeholder={t(lang, 'form_email_placeholder')} 
               required 
               aria-invalid={emailError}
               aria-describedby={emailError ? 'email-error' : undefined}
             />
           </div>
          <div className="form-group">
            <label htmlFor="subject">{t(lang, 'form_subject')}</label>
            <input type="text" id="subject" name="subject" placeholder={t(lang, 'form_subject_placeholder')} required />
          </div>
           <div className="form-group">
             <label htmlFor="message">Message</label>
             <textarea id="message" name="message" rows="5" placeholder={t(lang, 'form_message_placeholder')} required />
           </div>
           <button type="submit" className="btn-primary btn-full">{t(lang, 'form_send')}</button>
           {submitAttempted && (
             <div className="form-notice">
               {lang === 'fr' 
                 ? '📧 Votre client email va s\'ouvrir (Outlook, Gmail, etc.). Si rien ne se passe, voici l\'email : paolo.antonini.dev@gmail.com' 
                 : '📧 Your email client will open (Outlook, Gmail, etc.). If nothing happens, here\'s the email: paolo.antonini.dev@gmail.com'}
             </div>
           )}
         </motion.form>

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact-info-intro">
            <h3>{t(lang, 'contact_connect_title')}</h3>
            <p>{t(lang, 'contact_desc')}</p>
          </div>

          <div className="info-items">
            <div className="info-box">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="info-label">Email</p>
                <a href="mailto:paolo.antonini.dev@gmail.com">paolo.antonini.dev@gmail.com</a>
              </div>
            </div>
            <div className="info-box">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="info-label">{t(lang, 'location')}</p>
                <p className="info-value">Bordeaux, France</p>
              </div>
            </div>
          </div>

          <div className="social-section">
            <p className="info-label">{t(lang, 'follow_me')}</p>
            <div className="social-row">
              <a href="https://github.com/PayExe" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="19" height="19">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/paolo-antonini-579910383/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="19" height="19">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function LegalModal({ open, onClose, lang }) {
  const overlayRef = useRef()

  useEffect(() => {
    if (!open) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalOverflow
    }
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
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="legal-close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
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
            <div className="legal-section">
              <h3>{t(lang, 'legal_security_title')}</h3>
              <p>{t(lang, 'legal_security_text')}</p>
            </div>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CreditsModal({ open, onClose, lang }) {
  const overlayRef = useRef()

  useEffect(() => {
    if (!open) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalOverflow
    }
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
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="legal-close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2>{t(lang, 'credits_title')}</h2>
            <div className="legal-section">
              <h3>{t(lang, 'credits_react_title')}</h3>
              <p>{t(lang, 'credits_react_text')}</p>
              <p className="credit-link">
                <a href="https://github.com/Skyvence" target="_blank" rel="noopener noreferrer">github.com/Skyvence</a>
              </p>
            </div>
            <div className="legal-section">
              <h3>{t(lang, 'credits_self_title')}</h3>
              <p>{t(lang, 'credits_self_text')}</p>
            </div>
            <div className="legal-section">
              <h3>{t(lang, 'credits_bg_title')}</h3>
              <p>{t(lang, 'credits_bg_text')}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}



const sectionIds = ['about', 'projects', 'education', 'contact']

export default function App() {
  const [lang, setLang]       = useState(() => localStorage.getItem('lang')  || 'fr')
  const [theme, setTheme]     = useState(() => localStorage.getItem('theme') || 'dark')
  const [legalOpen, setLegalOpen]       = useState(false)
  const [creditsOpen, setCreditsOpen]   = useState(false)
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
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'instant' })
      setTimeout(() => setTransitioning(false), 150)
    }, 300)
  }, [])

  return (
    <>
      <HsrBg />
      <PageTransition active={transitioning} />
      <Navbar
        lang={lang} setLang={setLang}
        theme={theme} setTheme={setTheme}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
      <main>
        <Hero lang={lang} />
        <SectionDivider />
        <Projects lang={lang} />
        <SectionDivider />
        <Education lang={lang} />
        <SectionDivider />
        <Contact lang={lang} />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">Paolo<span>.</span></span>
          <p>&copy; {new Date().getFullYear()} Paolo Antonini</p>
          <button className="footer-legal" onClick={() => setLegalOpen(true)}>
            {t(lang, 'legal_link')}
          </button>
          <button className="footer-legal" onClick={() => setCreditsOpen(true)}>
            {t(lang, 'credits_link')}
          </button>
        </div>
      </footer>
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} lang={lang} />
      <CreditsModal open={creditsOpen} onClose={() => setCreditsOpen(false)} lang={lang} />
    </>
  )
}
