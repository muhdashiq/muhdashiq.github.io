import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Award, Cpu, Building2, Globe, GraduationCap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { metrics } from '../data/resumeData'
import type { Metric } from '../data/resumeData'
import { stagger, inViewOnce } from '../lib/motion'
import SectionHeader from './ui/SectionHeader'
import SpotlightCard from './ui/SpotlightCard'

const iconMap: Record<string, LucideIcon> = {
  Users,
  Award,
  Cpu,
  Building2,
  Globe,
  GraduationCap,
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }

    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

const accentMap = {
  indigo: {
    iconBg: 'bg-indigo-50 dark:bg-indigo-500/10',
    iconColor: 'text-indigo-500 dark:text-indigo-400',
    hover: 'hover:border-indigo-300 dark:hover:border-indigo-500/40',
    shadow: 'hover:shadow-indigo-500/10',
  },
  cyan: {
    iconBg: 'bg-cyan-50 dark:bg-cyan-500/10',
    iconColor: 'text-cyan-500 dark:text-cyan-400',
    hover: 'hover:border-cyan-300 dark:hover:border-cyan-500/40',
    shadow: 'hover:shadow-cyan-500/10',
  },
}

function MetricCard({ metric }: { metric: Metric }) {
  const Icon = iconMap[metric.icon]
  const accent = accentMap[metric.accentColor]

  return (
    <SpotlightCard className="p-6">
      <div className="flex items-start justify-between">
        <div className={`inline-flex p-2.5 rounded-xl ${accent.iconBg} mb-4`}>
          <Icon size={20} className={accent.iconColor} />
        </div>
        <span className="font-mono text-[10px] text-slate-400 dark:text-slate-600">{metric.id}</span>
      </div>
      <div className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-1">
        <AnimatedCounter target={metric.value} suffix={metric.suffix} />
      </div>
      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
        {metric.label}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
        {metric.sublabel}
      </div>
    </SpotlightCard>
  )
}

export default function MetricsBar() {
  return (
    <section id="impact" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          eyebrow="impact"
          title="Executive Impact at a Glance"
          subtitle="Measurable outcomes across organizations, AI platforms, and distributed systems."
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
