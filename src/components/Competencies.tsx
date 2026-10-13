import { motion } from 'framer-motion'
import { Users2, Server, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { competencies } from '../data/resumeData'
import type { CompetencyGroup } from '../data/resumeData'

const iconMap: Record<string, LucideIcon> = { Users2, Server, Rocket }

const groupStyles = [
  {
    iconBg: 'bg-indigo-50 dark:bg-indigo-500/10',
    iconColor: 'text-indigo-500 dark:text-indigo-400',
    tagBg: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/25 text-indigo-700 dark:text-indigo-300',
    headerBorder: 'border-indigo-200 dark:border-indigo-500/30',
  },
  {
    iconBg: 'bg-cyan-50 dark:bg-cyan-500/10',
    iconColor: 'text-cyan-500 dark:text-cyan-400',
    tagBg: 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/25 text-cyan-700 dark:text-cyan-300',
    headerBorder: 'border-cyan-200 dark:border-cyan-500/30',
  },
  {
    iconBg: 'bg-violet-50 dark:bg-violet-500/10',
    iconColor: 'text-violet-500 dark:text-violet-400',
    tagBg: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/25 text-violet-700 dark:text-violet-300',
    headerBorder: 'border-violet-200 dark:border-violet-500/30',
  },
]

function CompetencyCard({
  group,
  index,
}: {
  group: CompetencyGroup
  index: number
}) {
  const Icon = iconMap[group.icon]
  const style = groupStyles[index % groupStyles.length]

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
      transition={{ duration: 0.5 }}
      className="flex flex-col rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 overflow-hidden"
    >
      {/* Card header */}
      <div className={`px-6 py-5 border-b ${style.headerBorder} bg-slate-50/50 dark:bg-slate-800/80`}>
        <div className={`inline-flex p-2.5 rounded-xl ${style.iconBg} mb-3`}>
          <Icon size={20} className={style.iconColor} />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          {group.category}
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">{group.description}</p>
      </div>

      {/* Tags */}
      <div className="px-6 py-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${style.tagBg} transition-all`}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function Competencies() {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Core Competencies
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Strategic domains spanning organizational leadership, systems architecture, and product execution.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {competencies.map((group, i) => (
            <CompetencyCard key={group.id} group={group} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
