import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import MetricsBar from './components/MetricsBar'
import CareerTimeline from './components/CareerTimeline'
import Competencies from './components/Competencies'
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
    <div className="min-h-screen">
      <Navigation isDark={isDark} onToggleTheme={() => setIsDark((p) => !p)} />
      <main>
        <Hero />
        <MetricsBar />
        <CareerTimeline />
        <Competencies />
        <LeadershipPhilosophy />
      </main>
      <Footer />
    </div>
  )
}
