import { useState } from 'react'
import './App.css'

import photoboothClosed from './assets/photobooth/photobooth_closed.svg'
import photoboothOpen from './assets/photobooth/photobooth_open.svg'
import enterButton from './assets/photobooth/enter_button.svg'
import enterButtonHover from './assets/photobooth/enter_button_hover.svg'

function App() {
  const [isHovering, setIsHovering] = useState(false)

  const handleEnterClick = () => {
    // TODO: wire this up to the main app flow (e.g. route change or state)
    // For now this is just a placeholder so the button is interactive.
    console.log('Enter photobooth')
  }

  return (
    <main className="landing">
      <section className="landing__booth" aria-label="Photobooth entrance">
        <div className="landing__booth-body">
          <img
            src={isHovering ? photoboothOpen : photoboothClosed}
            alt="Photobooth kiosk"
            className="landing__booth-illustration"
          />

          <button
            type="button"
            className="landing__enter"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
            onClick={handleEnterClick}
          >
            <img
              src={isHovering ? enterButtonHover : enterButton}
              alt="enter"
              className="landing__enter-image"
            />
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
