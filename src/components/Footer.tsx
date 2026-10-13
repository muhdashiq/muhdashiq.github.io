import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, FileDown, MapPin } from 'lucide-react'
import { personalInfo, education } from '../data/resumeData'

const socialLinks = [
  {
    label: 'Email',
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: 'LinkedIn',
    href: personalInfo.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: 'GitHub',
    href: personalInfo.github,
    icon: Github,
    external: true,
  },
  {
    label: 'Download CV',
    href: personalInfo.resumePdf,
    icon: FileDown,
    external: false,
    download: true,
  },
]

const quickLinks = [
  { label: 'About', href: '#hero' },
  { label: 'Impact', href: '#impact' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Philosophy', href: '#philosophy' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                MA
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{personalInfo.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">{personalInfo.currentTitle}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
              {personalInfo.tagline}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
              <MapPin size={12} />
              {personalInfo.location}
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon, external, download }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(download ? { download: true } : {})}
                  className="inline-flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <Icon
                    size={15}
                    className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors"
                  />
                  {label}
                </a>
              ))}
            </div>

            {/* Education quick ref */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-600 mb-1.5 font-medium">Education</p>
              {education.slice(0, 2).map((ed) => (
                <p key={ed.degree} className="text-xs text-slate-500 dark:text-slate-600 leading-relaxed">
                  {ed.degree}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600">
            Built with React, Vite, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
