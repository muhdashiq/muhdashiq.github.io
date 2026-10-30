import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Sun, Moon, Menu, X, Download } from 'lucide-react'
import { personalInfo } from '../data/resumeData'

interface NavigationProps {
  isDark: boolean
  onToggleTheme: () => void
}

const navLinks = [
  { label: 'About',          href: '#hero',           id: 'hero'           },
  { label: 'Impact',         href: '#impact',         id: 'impact'         },
  { label: 'Experience',     href: '#experience',     id: 'experience'     },
  { label: 'Skills',         href: '#skills',         id: 'skills'         },
  { label: 'Education',      href: '#education',      id: 'education'      },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Philosophy',     href: '#philosophy',     id: 'philosophy'     },
]

export default function Navigation({ isDark, onToggleTheme }: NavigationProps) {
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Scroll-blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Mobile menu: close on Escape (returning focus to the toggle) and when resizing to desktop
  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => { if (desktop.matches) setMobileOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX, transformOrigin: '0%' }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
      />

      <nav aria-label="Primary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={closeMobile}
          aria-label={`${personalInfo.name} — back to top`}
          className="flex items-center gap-2.5 group rounded-xl"
        >
          <span aria-hidden className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all">
            MA
          </span>
          <span className="hidden sm:block font-semibold text-slate-900 dark:text-slate-100 text-sm">
            {personalInfo.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={activeSection === link.id ? 'location' : undefined}
                className={`relative block px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-slate-100 dark:bg-slate-800/60 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="relative inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                  exit={{    rotate: 90,  opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  <Sun aria-hidden="true" size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90,  opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                  exit={{    rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  <Moon aria-hidden="true" size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <motion.a
            href={personalInfo.resumePdf}
            download
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-sm"
          >
            <Download aria-hidden="true" size={14} />
            Download CV
          </motion.a>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate: 90,  opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  <X aria-hidden="true" size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90,  opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  <Menu aria-hidden="true" size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{    opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/60"
          >
            <ul className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMobile}
                    aria-current={activeSection === link.id ? 'location' : undefined}
                    className={`block px-3 py-3 rounded-lg text-base font-medium transition-all ${
                      activeSection === link.id
                        ? 'text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/60'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <motion.a
                  href={personalInfo.resumePdf}
                  download
                  onClick={closeMobile}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 w-full mt-2 px-3 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-base font-medium transition-colors"
                >
                  <Download aria-hidden="true" size={16} />
                  Download CV
                </motion.a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
