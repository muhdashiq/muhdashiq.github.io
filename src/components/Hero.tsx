import { motion } from 'framer-motion'
import { Download, Linkedin, Mail, ChevronDown, MapPin, Briefcase } from 'lucide-react'
import { personalInfo } from '../data/resumeData'

const floatingStats = [
  { label: '52+ Engineers Scaled', color: 'indigo' },
  { label: '16+ Years Leadership',  color: 'cyan'   },
  { label: 'AI-Native Executor',    color: 'violet' },
]

const trustLogos = ['Amazon', 'Oracle', 'Docusign', 'IIM Kozhikode']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, #6366f1 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">

          {/* ── Left: Content ── */}
          <div className="lg:col-span-3 space-y-7">
            {/* Status badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 ring-1 ring-inset ring-indigo-600/10 dark:ring-indigo-500/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
                </span>
                Open to Director / Head of Engineering Roles
              </span>
            </motion.div>

            {/* Name */}
            <div>
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.05]"
              >
                Muhammed{' '}
                <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Ashiq
                </span>
              </motion.h1>

              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-500"
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

            {/* Tagline */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl font-semibold text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-base text-slate-600 dark:text-slate-400 max-w-xl leading-loose"
            >
              {personalInfo.subHeadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href={personalInfo.resumePdf}
                download
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30"
              >
                <Download size={16} />
                Download CV
              </motion.a>
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-colors"
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

            {/* Trust bar */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-3">
                Career across
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {trustLogos.map((name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Avatar ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Avatar with continuous float */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 blur-xl" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-20" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20"
              >
                <span className="text-6xl sm:text-7xl font-black text-white tracking-tight select-none">
                  MA
                </span>
              </motion.div>
            </div>

            {/* Floating stat chips */}
            <div className="flex flex-col items-center gap-2.5 w-full max-w-xs">
              {floatingStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                  className={`w-full px-4 py-2.5 rounded-xl text-center text-sm font-semibold border backdrop-blur-sm ${
                    stat.color === 'indigo'
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300'
                      : stat.color === 'cyan'
                      ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300'
                      : 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/30 text-violet-700 dark:text-violet-300'
                  }`}
                >
                  {stat.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
