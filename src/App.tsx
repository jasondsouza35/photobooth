import { useEffect, useState } from 'react'
import './App.css'

import Landing from './pages/Landing'
import InsideBooth from './pages/InsideBooth'

type View = 'landing' | 'booth'

const getViewFromLocation = (): View => {
  if (typeof window === 'undefined') return 'landing'
  return window.location.pathname === '/inside-booth' ? 'booth' : 'landing'
}

function App() {
  const [view, setView] = useState<View>(() => getViewFromLocation())

  useEffect(() => {
    const handlePopState = () => {
      setView(getViewFromLocation())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const showLanding = view === 'landing'

  const navigateTo = (nextView: View) => {
    if (typeof window !== 'undefined') {
      const targetPath = nextView === 'booth' ? '/inside-booth' : '/'
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath)
      }
    }
    setView(nextView)
  }

  const handleEnterClick = () => {
    navigateTo('booth')
  }

  return (
    <main className={showLanding ? 'landing' : 'booth'}>
      {showLanding ? <Landing onEnter={handleEnterClick} /> : <InsideBooth />}
    </main>
  )
}

export default App
