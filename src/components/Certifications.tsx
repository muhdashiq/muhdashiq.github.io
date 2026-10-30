import { motion } from 'framer-motion'
import { Award, BadgeCheck, ExternalLink, Building2 } from 'lucide-react'
import { certifications } from '../data/resumeData'
import type { Certification } from '../data/resumeData'
import { stagger, inViewOnce, fadeUp, easeOutExpo } from '../lib/motion'
import SectionHeader from './ui/SectionHeader'

function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
      className="conic-border relative rounded-3xl shadow-xl shadow-indigo-500/5 dark:shadow-cyan-500/5 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full aurora opacity-20" style={{ background: 'radial-gradient(closest-side, #6366f1, transparent)' }} />

      <div className="relative grid lg:grid-cols-5 gap-8 p-7 sm:p-10">
        {/* Credential identity */}
        <div className="lg:col-span-3 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="relative inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/30"
            >
              <Award size={26} />
            </motion.div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
              <BadgeCheck size={13} />
              {cert.type}
            </span>
            {cert.year && (
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{cert.year}</span>
            )}
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
              {cert.title}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Building2 size={14} className="text-indigo-500" />
              {cert.issuer}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{cert.description}</p>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-cyan-300 hover:underline"
            >
              View credential
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Capabilities unlocked */}
        <div className="lg:col-span-2">
          <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-slate-950/60 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              capabilities.unlocked()
            </p>
            <motion.ul
              variants={stagger(0.07, 0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2.5"
            >
              {cert.skills.map((skill) => (
                <motion.li
                  key={skill}
                  variants={{ hidden: { opacity: 0, x: 12 }, visible: { opacity: 1, x: 0, transition: { ease: easeOutExpo } } }}
                  className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500/10 dark:bg-cyan-400/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400" />
                  </span>
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Certifications() {
  if (certifications.length === 0) return null

  return (
    <section id="certifications" className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05"
          eyebrow="certifications"
          title="Certifications"
          subtitle="Executive credentials that connect technology strategy, AI transformation, and governance at the leadership table."
        />

        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid gap-6"
        >
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
