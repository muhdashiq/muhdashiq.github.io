import { motion } from 'framer-motion'
import { Heart, Network, Zap, Brain } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { philosophies } from '../data/resumeData'
import type { Philosophy } from '../data/resumeData'
import { stagger, inViewOnce } from '../lib/motion'
import SectionHeader from './ui/SectionHeader'
import SpotlightCard from './ui/SpotlightCard'

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
    <SpotlightCard className="p-7 flex flex-col gap-4">
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
    </SpotlightCard>
  )
}

export default function LeadershipPhilosophy() {
  return (
    <section id="philosophy" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="06"
          eyebrow="philosophy"
          title="Leadership Philosophy"
          subtitle="Four principles that guide every team I build and every AI platform I ship."
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
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
