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
          <button className="nav-toggle-btn" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} aria-label="Toggle language">
            <span className="lang-label">{lang === 'fr' ? 'EN' : 'FR'}</span>
          </button>
          <button className="nav-toggle-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
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
          <p className="hero-subtitle">{t(lang, 'hero_subtitle')}</p>
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
const personalProjects = [
  {
    id: 'osadeo',
    date: { fr: 'Nov 2025', en: 'Nov 2025' },
    title: 'Osadeo Studio',
    desc: {
      fr: "Un de mes projets les plus ambitieux. Osadeo Studio c'est un studio indépendant de jeux vidéo créé entre amis, par passion. On travaille actuellement sur notre premier jeu sous Godot. C'est un projet long terme qui nous tient vraiment à coeur.",
      en: "One of my most ambitious projects. Osadeo Studio is an independent video game studio created between friends, out of passion. We're currently working on our first game in Godot. It's a long-term project that we really care about.",
    },
    tags: ['Godot', 'GDScript', 'Game Dev'],
    link: 'https://github.com/osadeo-studio',
  },
  {
    id: 'bhost',
    date: { fr: 'Nov 2025', en: 'Nov 2025' },
    title: 'BHOST',
    desc: {
      fr: "Un jeu développé sous Godot dans le cadre d'Osadeo Studio. BHOST c'est une chasse aux fantômes... pas comme les autres. Un concept original qu'on développe à plusieurs, mêlant exploration et gameplay unique.",
      en: "A game developed in Godot as part of Osadeo Studio. BHOST is a ghost hunt... unlike any other. An original concept we're building together, mixing exploration and unique gameplay.",
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
      en: "Website I created for my best friend, artist of the NS!! Records label. Originally made as a birthday gift, the goal was to showcase his musical universe with a dark design, terminal animations and a retro art direction chosen by the artist himself.",
    },
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/PayExe/NSWEBSITE',
  },
  {
    id: 'steamy',
    date: { fr: 'Juil 2025', en: 'Jul 2025' },
    title: 'Steamy',
    desc: {
      fr: "Bot Discord qui connecte mon serveur à Steam. Wishlist personnelle, recherche de jeux, fiches détaillées avec prix et évaluations, jeu au hasard, autocomplete, restriction par salon et anti-spam. Mon premier vrai projet perso en JavaScript.",
      en: "Discord bot that connects my server to Steam. Personal wishlist, game search, detailed info with prices and reviews, random game, autocomplete, channel restriction and anti-spam. My first real personal project in JavaScript.",
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
      fr: "Puissance 4 jouable en terminal, écrit en C. Projet réalisé en première année à Ynov.",
      en: 'Connect 4 playable in terminal, written in C. First year project at Ynov.',
    },
    tags: ['C', 'Terminal'],
    link: 'https://ytrack.learn.ynov.com/git/gvincent/Power4.git',
  },
  {
    id: 'gigamania',
    title: 'Giga Mania',
    desc: {
      fr: "Site e-commerce de jeux vidéo en PHP orienté objet avec gestion de panier et base de données. Projet de groupe en première année.",
      en: 'Video game e-commerce site in object-oriented PHP with cart management and database. Group project in first year.',
    },
    tags: ['PHP', 'OOP', 'MySQL'],
    link: 'https://github.com/SkyVence/poo-game-shop',
  },
]

function Projects({ lang }) {
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

      {/* Timeline - Personal projects (skyvence style: date on the side) */}
      <div className="projects-timeline">
        {personalProjects.map((p, i) => (
          <motion.div
            className="project-item"
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="project-date-col">
              <span className="project-date">{p.date[lang]}</span>
            </div>
            <div className="project-line">
              <div className="project-dot" />
              <div className="project-line-bar" />
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
                {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
                {t(lang, 'view_project')} →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* School projects - side by side */}
      <motion.div
        className="school-projects-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
          >
            <h4>{p.title}</h4>
            <p>{p.desc[lang]}</p>
            <div className="tag-row">
              {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
              {t(lang, 'view_repo')} →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ───────── Education ───────── */
function Education({ lang }) {
  const items = [
    {
      school: 'Ynov Campus Bordeaux',
      period: { fr: '2025 – aujourd\'hui', en: '2025 – present' },
      degree: { fr: "Bachelor Informatique — 1ère année", en: "Bachelor's Computer Science — 1st year" },
      desc: {
        fr: "Le vrai début de l'aventure. Développement web, bases de données, programmation orientée objet, réseaux... C'est ici que je structure tout ce que j'ai appris en autodidacte et que je découvre de nouveaux domaines comme la cybersécurité et l'IA.",
        en: "The real start of the adventure. Web development, databases, object-oriented programming, networking... This is where I structure everything I learned on my own and discover new fields like cybersecurity and AI.",
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
        en: "Where it all started. It was in high school that I discovered programming with Python in NSI and started learning web development on my own. That's when I knew I wanted to make it my career.",
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t(lang, 'education_label')}</span>
        <h2 className="section-title">{t(lang, 'education_title')}</h2>
      </motion.div>

      <div className="edu-stack">
        {items.map((item, i) => (
          <motion.div
            className="edu-card"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <div className="edu-card-header">
              <div>
                <h3>{typeof item.school === 'string' ? item.school : item.school[lang]}</h3>
                <h4 className="edu-degree">{typeof item.degree === 'string' ? item.degree : item.degree[lang]}</h4>
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

/* ───────── Contact ───────── */
function Contact({ lang }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.elements['name'].value
    const email = form.elements['email'].value
    const subject = form.elements['subject'].value
    const message = form.elements['message'].value
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
      </motion.div>

      <div className="contact-grid">
        {/* Form like Antoine: labels above inputs, subject field */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-group">
            <label htmlFor="name">{t(lang, 'form_name')}</label>
            <input type="text" id="name" name="name" placeholder={t(lang, 'form_name_placeholder')} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder={t(lang, 'form_email_placeholder')} required />
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
        </motion.form>

        {/* Info side */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="contact-info-intro">
            <h3>{t(lang, 'contact_connect_title')}</h3>
            <p>{t(lang, 'contact_desc')}</p>
          </div>

          <div className="info-items">
            <div className="info-box">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="info-label">Email</p>
                <a href="mailto:paolo.antonini.dev@gmail.com">paolo.antonini.dev@gmail.com</a>
              </div>
            </div>
            <div className="info-box">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
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
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/paolo-antonini-579910383/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
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
