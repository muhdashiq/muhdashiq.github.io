import { useState, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import MetricsBar from './components/MetricsBar'
import CareerTimeline from './components/CareerTimeline'
import Competencies from './components/Competencies'
import Education from './components/Education'
import Certifications from './components/Certifications'
import LeadershipPhilosophy from './components/LeadershipPhilosophy'
import Footer from './components/Footer'

function readTheme() {
  try {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  } catch {
    return true
  }
}

export default function App() {
  const [isDark, setIsDark] = useState(readTheme)

  useEffect(() => {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      // Storage can be unavailable (e.g. privacy mode); the theme still applies for this visit.
    }
    document.documentElement.classList.toggle('dark', isDark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#020617' : '#f8fafc')
  }, [isDark])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="min-h-screen">
        <Navigation isDark={isDark} onToggleTheme={() => setIsDark((p) => !p)} />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <Hero />
          <MetricsBar />
          <CareerTimeline />
          <Competencies />
          <Education />
          <Certifications />
          <LeadershipPhilosophy />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
