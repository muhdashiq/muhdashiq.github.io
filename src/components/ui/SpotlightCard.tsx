import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { fadeUp } from '../../lib/motion'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  variants?: Variants
  lift?: boolean
}

/** Card with a cursor-following glow and gradient border highlight. */
export default function SpotlightCard({ children, className = '', variants = fadeUp, lift = true }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onMouseMove={onMouseMove}
      whileHover={lift ? { y: -4, transition: { type: 'spring', stiffness: 300, damping: 24 } } : undefined}
      className={`spotlight-card group relative rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-indigo-300 dark:hover:border-cyan-400/30 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-cyan-500/5 ${className}`}
    >
      {children}
    </motion.div>
  )
}
