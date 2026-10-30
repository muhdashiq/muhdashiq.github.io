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

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <Navigation isDark={isDark} onToggleTheme={() => setIsDark((p) => !p)} />
        <main>
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
