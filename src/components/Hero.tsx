import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Download, Linkedin, Mail, ChevronDown, MapPin, Briefcase, Sparkles } from 'lucide-react'
import { personalInfo, metrics } from '../data/resumeData'
import { easeOutExpo } from '../lib/motion'
import AgentNetwork from './AgentNetwork'

const trustLogos = ['Docusign', 'Amazon', 'Oracle', 'IIM Kozhikode']

const teamScale = metrics.find((m) => m.id === 'team-scale')

const traceLines = [
  { prompt: '$', text: 'agent.run("scale AI platform org")', tone: 'text-slate-200' },
  { prompt: '→', text: 'context: 16+ yrs distributed systems', tone: 'text-slate-400' },
  { prompt: '→', text: 'tools: federated RAG · NLP workflows · APIs', tone: 'text-slate-400' },
  { prompt: '→', text: `team: 2 → ${teamScale?.value ?? 22} engineers`, tone: 'text-slate-400' },
  { prompt: '✓', text: 'status: shipping at enterprise scale', tone: 'text-emerald-400' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.7, ease: easeOutExpo },
  }),
}

function RotatingFocus() {
  const words = personalInfo.rotatingFocus
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2600)
    return () => window.clearInterval(id)
  }, [reduce, words.length])

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
          className="animated-gradient-text font-bold whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function AgentTrace() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: easeOutExpo }}
      className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-950/90 shadow-2xl shadow-indigo-950/30 overflow-hidden"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 bg-slate-900/80">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 font-mono text-[10px] text-slate-500">leadership-agent · trace</span>
      </div>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.35, delayChildren: 1.5 } } }}
        className="px-4 py-3 space-y-1 font-mono text-[11px] leading-relaxed"
      >
        {traceLines.map((line, i) => (
          <motion.li
            key={line.text}
            variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
            className="flex gap-2"
          >
            <span className={i === 0 ? 'text-cyan-400' : line.prompt === '✓' ? 'text-emerald-400' : 'text-indigo-400'}>
              {line.prompt}
            </span>
            <span className={line.tone}>
              {line.text}
              {i === traceLines.length - 1 && <span className="caret ml-0.5 text-cyan-400">▍</span>}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      {/* Background: grid + drifting aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 ai-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 w-[640px] h-[480px] rounded-full aurora opacity-30 dark:opacity-20"
        style={{ background: 'radial-gradient(closest-side, #6366f1, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[520px] h-[420px] rounded-full aurora opacity-25 dark:opacity-15"
        style={{ background: 'radial-gradient(closest-side, #06b6d4, transparent)', animationDelay: '-9s' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* ── Left: Content ── */}
          <div className="lg:col-span-7 min-w-0 space-y-7">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-slate-900/70 backdrop-blur text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {personalInfo.openTo}
              </span>
            </motion.div>

            <div>
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.05]"
              >
                Muhammed <span className="gradient-text">Ashiq</span>
              </motion.h1>

              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500"
              >
                <span className="flex items-center gap-1">
                  <Briefcase size={14} />
                  {personalInfo.currentTitle} · {personalInfo.currentCompany}
                </span>
                <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {personalInfo.location}
                </span>
              </motion.div>
            </div>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 max-w-2xl leading-snug"
            >
              Leading <RotatingFocus />
              <span className="block text-base sm:text-lg font-medium text-slate-500 dark:text-slate-400 mt-1">
                {personalInfo.tagline}
              </span>
            </motion.p>

            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-base text-slate-600 dark:text-slate-400 max-w-xl leading-loose"
            >
              {personalInfo.subHeadline}
            </motion.p>

            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
              <motion.a
                href={personalInfo.resumePdf}
                download
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 transition-shadow overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <Download size={16} />
                Download CV
              </motion.a>
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <Linkedin size={16} className="text-indigo-500" />
                LinkedIn
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}?subject=Let%27s%20Connect`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <Mail size={16} />
                Get in Touch
              </motion.a>
            </motion.div>

            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                <Sparkles size={12} className="text-cyan-500" />
                Career across
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {trustLogos.map((name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Agent network ── */}
          <div className="lg:col-span-5 min-w-0 flex flex-col items-center gap-6">
            <AgentNetwork />
            <AgentTrace />
          </div>
        </div>
      </div>

      <motion.a
        href="#impact"
        aria-label="Scroll to impact"
        className="absolute bottom-6 left-1/2 text-slate-400 dark:text-slate-600 hover:text-indigo-500"
        style={{ x: '-50%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} />
      </motion.a>
    </section>
  )
}
