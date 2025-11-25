import { useState } from 'react'

import photoboothClosed from '../assets/photobooth/photobooth_closed.svg'
import photoboothOpen from '../assets/photobooth/photobooth_open.svg'
import enterButton from '../assets/photobooth/enter_button.svg'
import enterButtonHover from '../assets/photobooth/enter_button_hover.svg'

type LandingProps = {
  onEnter: () => void
}

const Landing = ({ onEnter }: LandingProps) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
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
          onClick={onEnter}
        >
          <img
            src={isHovering ? enterButtonHover : enterButton}
            alt="enter"
            className="landing__enter-image"
          />
        </button>
      </div>
    </section>
  )
}

export default Landing
