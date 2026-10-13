import { motion } from 'framer-motion'
import { Heart, Network, Zap, Brain } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { philosophies } from '../data/resumeData'
import type { Philosophy } from '../data/resumeData'

const iconMap: Record<string, LucideIcon> = { Heart, Network, Zap, Brain }

const accentMap: Record<
  Philosophy['accentColor'],
  { iconBg: string; iconColor: string; border: string; tagline: string; quote: string }
> = {
  indigo: {
    iconBg: 'bg-indigo-50 dark:bg-indigo-500/10',
    iconColor: 'text-indigo-500 dark:text-indigo-400',
    border: 'hover:border-indigo-300 dark:hover:border-indigo-500/40',
    tagline: 'text-indigo-600 dark:text-indigo-400',
    quote: 'border-l-indigo-400 dark:border-l-indigo-500',
  },
  cyan: {
    iconBg: 'bg-cyan-50 dark:bg-cyan-500/10',
    iconColor: 'text-cyan-500 dark:text-cyan-400',
    border: 'hover:border-cyan-300 dark:hover:border-cyan-500/40',
    tagline: 'text-cyan-600 dark:text-cyan-400',
    quote: 'border-l-cyan-400 dark:border-l-cyan-500',
  },
  emerald: {
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    border: 'hover:border-emerald-300 dark:hover:border-emerald-500/40',
    tagline: 'text-emerald-600 dark:text-emerald-400',
    quote: 'border-l-emerald-400 dark:border-l-emerald-500',
  },
  violet: {
    iconBg: 'bg-violet-50 dark:bg-violet-500/10',
    iconColor: 'text-violet-500 dark:text-violet-400',
    border: 'hover:border-violet-300 dark:hover:border-violet-500/40',
    tagline: 'text-violet-600 dark:text-violet-400',
    quote: 'border-l-violet-400 dark:border-l-violet-500',
  },
}

function PhilosophyCard({ philosophy }: { philosophy: Philosophy }) {
  const Icon = iconMap[philosophy.icon]
  const accent = accentMap[philosophy.accentColor]

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
      transition={{ duration: 0.5 }}
      className={`p-7 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 ${accent.border} hover:shadow-lg transition-colors duration-300 flex flex-col gap-4`}
    >
      <div>
        <div className={`inline-flex p-3 rounded-xl ${accent.iconBg} mb-4`}>
          <Icon size={22} className={accent.iconColor} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
          {philosophy.title}
        </h3>
        <p className={`text-sm font-semibold italic ${accent.tagline}`}>
          "{philosophy.tagline}"
        </p>
      </div>
      <p
        className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-3 border-l-2 ${accent.quote}`}
      >
        {philosophy.description}
      </p>
    </motion.div>
  )
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function LeadershipPhilosophy() {
  return (
    <section id="philosophy" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Leadership Philosophy
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Four principles that guide every team I build and every product I ship.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {philosophies.map((p) => (
            <PhilosophyCard key={p.id} philosophy={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
