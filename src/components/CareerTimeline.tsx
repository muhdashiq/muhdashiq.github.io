import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Clock, Users, CheckCircle2, Star } from 'lucide-react'
import { experiences } from '../data/resumeData'
import type { Experience } from '../data/resumeData'

const typeStyles: Record<Experience['type'], { dot: string; badge: string; badgeText: string }> = {
  current: {
    dot: 'bg-indigo-500 ring-4 ring-indigo-500/20',
    badge: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400',
    badgeText: 'Current',
  },
  leadership: {
    dot: 'bg-cyan-500 ring-4 ring-cyan-500/20',
    badge: 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
    badgeText: 'Leadership',
  },
  ic: {
    dot: 'bg-slate-400 dark:bg-slate-600 ring-4 ring-slate-400/20 dark:ring-slate-600/20',
    badge: 'bg-slate-100 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400',
    badgeText: 'IC',
  },
  founder: {
    dot: 'bg-violet-500 ring-4 ring-violet-500/20',
    badge: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/30 text-violet-600 dark:text-violet-400',
    badgeText: 'Founder',
  },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemAnim = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function CareerTimeline() {
  const [expandedId, setExpandedId] = useState<string>('docusign')

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? '' : id))

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Career Trajectory
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            A progressive journey from engineer to enterprise engineering leader.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500 via-cyan-500/50 to-transparent" />

          <div className="space-y-4">
            {experiences.map((exp) => {
              const style = typeStyles[exp.type]
              const isOpen = expandedId === exp.id

              return (
                <motion.div key={exp.id} variants={itemAnim} className="relative pl-12 sm:pl-14">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1.5 sm:left-2.5 top-5 w-5 h-5 rounded-full ${style.dot} flex items-center justify-center`}
                  >
                    {exp.type === 'current' && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50'
                        : 'bg-white/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800/60 hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                  >
                    {/* Header — always visible, clickable */}
                    <button
                      onClick={() => toggle(exp.id)}
                      className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${style.badge}`}
                          >
                            {exp.type === 'current' && <Star size={10} fill="currentColor" />}
                            {style.badgeText}
                          </span>
                          {exp.teamSize && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                              <Users size={10} />
                              {exp.teamSize} team
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                          {exp.role}
                        </h3>
                        <p className="mt-0.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                          {exp.company}
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {exp.period}
                          </span>
                          <span className="hidden sm:inline">{exp.duration}</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 mt-1 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Expandable body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={exp.id + '-body'}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700/50 pt-4 space-y-4">
                            {/* Summary */}
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                              {exp.summary}
                            </p>

                            {/* Highlights */}
                            <ul className="space-y-2.5">
                              {exp.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <CheckCircle2
                                    size={15}
                                    className={`flex-shrink-0 mt-0.5 ${
                                      h.isMetric
                                        ? 'text-indigo-500 dark:text-indigo-400'
                                        : 'text-slate-400 dark:text-slate-600'
                                    }`}
                                  />
                                  <span
                                    className={`text-sm leading-relaxed ${
                                      h.isMetric
                                        ? 'text-slate-800 dark:text-slate-200 font-medium'
                                        : 'text-slate-600 dark:text-slate-400'
                                    }`}
                                  >
                                    {h.text}
                                  </span>
                                </li>
                              ))}
                            </ul>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {exp.techTags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
