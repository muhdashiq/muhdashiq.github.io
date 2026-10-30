import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Users, Database, Brain, Wrench, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { easeOutExpo } from '../lib/motion'
import { useMediaQuery } from '../lib/useMediaQuery'

interface AgentNode {
  label: string
  sub: string
  icon: LucideIcon
  color: string
}

const nodes: AgentNode[] = [
  { label: 'Strategy',   sub: 'roadmap',     icon: Compass,     color: 'text-indigo-500 dark:text-indigo-300' },
  { label: 'Context',    sub: 'RAG · data',  icon: Database,    color: 'text-cyan-500 dark:text-cyan-300' },
  { label: 'Models',     sub: 'LLM · NLP',   icon: Brain,       color: 'text-violet-500 dark:text-violet-300' },
  { label: 'Tools',      sub: 'APIs · MCP',  icon: Wrench,      color: 'text-cyan-500 dark:text-cyan-300' },
  { label: 'Governance', sub: 'SLOs · trust', icon: ShieldCheck, color: 'text-emerald-500 dark:text-emerald-300' },
  { label: 'People',     sub: 'org design',  icon: Users,       color: 'text-indigo-500 dark:text-indigo-300' },
]

const CENTER = 200
const RADIUS = 148

const positions = nodes.map((_, i) => {
  const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) }
})

export default function AgentNetwork() {
  const reduce = useReducedMotion()
  const isSmall = useMediaQuery('(max-width: 639px)')
  // Continuous ambient motion is skipped on small screens and for reduced-motion users.
  const lite = reduce || isSmall

  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[420px] aspect-square mx-auto select-none" aria-hidden>
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <radialGradient id="core-glow">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CENTER} cy={CENTER} r="120" fill="url(#core-glow)" />

        {/* Orbit rings */}
        <motion.g
          animate={lite ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="url(#edge)" strokeOpacity="0.25" strokeDasharray="2 6" />
          <circle cx={CENTER} cy={CENTER} r="186" fill="none" stroke="url(#edge)" strokeOpacity="0.12" strokeDasharray="1 10" />
        </motion.g>

        {/* Edges from the orchestrator to each capability */}
        {positions.map((p, i) => (
          <g key={nodes[i].label}>
            <motion.line
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="url(#edge)"
              strokeWidth="1.25"
              strokeOpacity="0.55"
              className={lite ? undefined : 'dash-flow'}
              strokeDasharray={lite ? '4 8' : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.8, ease: easeOutExpo }}
            />
            {!lite && (
              <motion.circle
                r="3"
                fill="#22d3ee"
                initial={{ cx: CENTER, cy: CENTER, opacity: 0 }}
                animate={{ cx: [CENTER, p.x], cy: [CENTER, p.y], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, delay: 1.6 + i * 0.35, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
              />
            )}
          </g>
        ))}

        {/* Cross-links between neighbouring capabilities */}
        {positions.map((p, i) => {
          const n = positions[(i + 1) % positions.length]
          return (
            <motion.line
              key={`ring-${i}`}
              x1={p.x}
              y1={p.y}
              x2={n.x}
              y2={n.y}
              stroke="#6366f1"
              strokeOpacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.4 + i * 0.08, duration: 0.6 }}
            />
          )
        })}
      </svg>

      {/* Orchestrator core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: easeOutExpo }}
          className="relative"
        >
          {!lite && (
            <motion.span
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500"
              animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 shadow-2xl shadow-indigo-500/30 flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">MA</span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">orchestrator</span>
          </div>
        </motion.div>
      </div>

      {/* Capability nodes */}
      {nodes.map((node, i) => {
        const Icon = node.icon
        const p = positions[i]
        return (
          <div
            key={node.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.12, duration: 0.6, ease: easeOutExpo }}
            >
              <motion.div
                animate={lite ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/70 shadow-lg shadow-slate-900/5 backdrop-blur">
                  <Icon aria-hidden="true" size={20} className={node.color} />
                </div>
                <div className="text-center leading-tight">
                  <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">{node.label}</div>
                  <div className="font-mono text-[9px] text-slate-400 dark:text-slate-500">{node.sub}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
