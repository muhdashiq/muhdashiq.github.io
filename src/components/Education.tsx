import { motion } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/resumeData'
import type { Education as EducationItem } from '../data/resumeData'
import { stagger, inViewOnce, fadeUp } from '../lib/motion'
import SectionHeader from './ui/SectionHeader'
import SpotlightCard from './ui/SpotlightCard'

const accentMap: Record<EducationItem['accentColor'], { icon: string; badge: string; bar: string; chip: string }> = {
  indigo: {
    icon: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-300',
    badge: 'text-indigo-600 dark:text-indigo-300',
    bar: 'from-indigo-500 to-violet-500',
    chip: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/25 text-indigo-700 dark:text-indigo-300',
  },
  cyan: {
    icon: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-500 dark:text-cyan-300',
    badge: 'text-cyan-700 dark:text-cyan-300',
    bar: 'from-cyan-500 to-emerald-500',
    chip: 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/25 text-cyan-700 dark:text-cyan-300',
  },
  violet: {
    icon: 'bg-violet-50 dark:bg-violet-500/10 text-violet-500 dark:text-violet-300',
    badge: 'text-violet-600 dark:text-violet-300',
    bar: 'from-violet-500 to-fuchsia-500',
    chip: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/25 text-violet-700 dark:text-violet-300',
  },
}

function EducationCard({ item, index }: { item: EducationItem; index: number }) {
  const accent = accentMap[item.accentColor]

  return (
    <SpotlightCard className="overflow-hidden">
      <div className="p-7 flex flex-col gap-5 h-full">
        <motion.span
          aria-hidden
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, delay: 0.2 } } }}
          style={{ originX: 0 }}
          className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent.bar}`}
        />

        <div className="flex items-start justify-between gap-4">
          <div className={`inline-flex p-3 rounded-xl ${accent.icon}`}>
            <GraduationCap aria-hidden="true" size={22} />
          </div>
          <span aria-hidden className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
            degree_{String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${accent.badge}`}>{item.type}</p>
          <h3 className="mt-1.5 text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">{item.degree}</h3>
          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">{item.institution}</p>
          {item.campus && (
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <MapPin aria-hidden="true" size={12} />
              {item.campus}
            </p>
          )}
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>

        <motion.div variants={stagger(0.05, 0.3)} className="mt-auto flex flex-wrap gap-2 pt-1">
          {item.focus.map((f) => (
            <motion.span
              key={f}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${accent.chip}`}
            >
              {f}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </SpotlightCard>
  )
}

export default function Education() {
  return (
    <section id="education" className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 ai-grid opacity-60" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04"
          eyebrow="education"
          title="Education"
          subtitle="Computer science depth meets business leadership — the dual foundation for running engineering as a strategic function."
        />

        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {education.map((item, i) => (
            <EducationCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-8 text-center font-mono text-xs text-slate-500 dark:text-slate-400"
        >
          {'// technical depth × business acumen → engineering leadership'}
        </motion.p>
      </div>
    </section>
  )
}
