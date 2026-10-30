import { motion } from 'framer-motion'
import { fadeUp, stagger, inViewOnce } from '../../lib/motion'

interface SectionHeaderProps {
  index: string
  eyebrow: string
  title: string
  subtitle: string
}

export default function SectionHeader({ index, eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      className="text-center mb-14"
    >
      <motion.div
        variants={fadeUp}
        className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full font-mono text-[11px] tracking-wider uppercase text-indigo-600 dark:text-cyan-300 bg-indigo-50/80 dark:bg-cyan-400/5 border border-indigo-200 dark:border-cyan-400/20"
      >
        <span aria-hidden className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
        </span>
        <span aria-hidden className="text-slate-600 dark:text-slate-400">{index}</span>
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
      >
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        {subtitle}
      </motion.p>
    </motion.div>
  )
}
