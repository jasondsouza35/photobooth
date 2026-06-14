import { useState, useRef } from 'react'

import curtainLeft from '../assets/camera/curtain/Vector 232.svg'
import curtainRight from '../assets/camera/curtain/Vector 233.svg'
import cameraStateBlack from '../assets/camera/camera_states/camera_black.svg'
import cameraStateGreen from '../assets/camera/camera_states/camera_green.svg'
import cameraStateRed from '../assets/camera/camera_states/camera_red.svg'
import cameraFrame from '../assets/camera/camera_frame.svg'
import takePictureButton from '../assets/camera/take_picture.svg'
import takePictureButtonHover from '../assets/camera/take_picture_hover.svg'
import uploadPhotoButton from '../assets/camera/upload_photo.svg'
import uploadPhotoButtonHover from '../assets/camera/upload_photo_hover.svg'
import startButton from '../assets/camera/start_button.svg'
import startButtonHover from '../assets/camera/start_button_hover.svg'
import colourSliderOff from '../assets/camera/sliders/colour_slider_off.svg'
import colourSliderOn from '../assets/camera/sliders/colour_slider_on.svg'
import blackAndWhiteSliderOn from '../assets/camera/sliders/black_and_white_slider_on.svg'
import blackAndWhiteSliderOff from '../assets/camera/sliders/black_and_white_slider_off.svg'
import photoInstructions from '../assets/camera/photo_instructions.svg'

import ResultScreen from './ResultScreen'
import TakePicture, { type TakePictureRef } from './TakePicture'

type View = 'menu' | 'camera' | 'upload' | 'result'
type Filter = 'color' | 'bw'

const InsideBooth = () => {
  const [view, setView] = useState<View>('menu')
  const [filter, setFilter] = useState<Filter>('color')
  const [photos, setPhotos] = useState<string[]>([])
  const [cameraStatus, setCameraStatus] = useState<'black' | 'green' | 'red'>('black')
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [shouldAutoStart, setShouldAutoStart] = useState(false)
  const takePictureRef = useRef<TakePictureRef>(null)

  const handleTakePicture = () => {
    setShouldAutoStart(false) // Screen button enters camera mode without auto-triggering
    setView('camera')
    setCameraStatus('green')
  }

  const handleStartCountdown = () => {
    // If already in camera view, trigger directly
    if (view === 'camera' && takePictureRef.current) {
      takePictureRef.current.startCountdown()
    } else {
      // Otherwise switch view and auto-start
      setShouldAutoStart(true)
      setView('camera')
      setCameraStatus('green')
      setPhotos([])
    }
  }

  const toggleFilter = () => {
    setFilter(prev => prev === 'color' ? 'bw' : 'color')
  }

  return (
    <section className="booth__scene" aria-label="Photobooth interior">
      {view !== 'result' && (
        <>
          <img
            src={curtainLeft}
            alt=""
            className="booth__curtain booth__curtain--left"
            aria-hidden="true"
          />
          <img
            src={curtainRight}
            alt=""
            className="booth__curtain booth__curtain--right"
            aria-hidden="true"
          />
        </>
      )}

      <div className="booth__center-column">
        {view === 'result' ? (
          <ResultScreen photos={photos} filter={filter === 'bw' ? 'grayscale(100%)' : 'none'} />
        ) : (
          <>
            <div className="booth__camera-head">
              <img
                src={
                  cameraStatus === 'green' ? cameraStateGreen :
                    cameraStatus === 'red' ? cameraStateRed :
                      cameraStateBlack
                }
                alt="Camera lens and indicator"
              />
            </div>

            <div className="booth__screen">
              <img src={cameraFrame} alt="Camera frame" className="booth__screen-frame" />

              {view === 'menu' && (
                <>
                  <button
                    type="button"
                    className="booth__screen-action booth__screen-action--top"
                    onClick={handleTakePicture}
                    onMouseEnter={() => setHoveredButton('takePicture')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <img
                      src={hoveredButton === 'takePicture' ? takePictureButtonHover : takePictureButton}
                      alt="take a picture"
                      style={{ width: '100%', height: '100%', display: 'block' }}
                    />
                  </button>
                  <button
                    type="button"
                    className="booth__screen-action booth__screen-action--bottom"
                    onMouseEnter={() => setHoveredButton('upload')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <img
                      src={hoveredButton === 'upload' ? uploadPhotoButtonHover : uploadPhotoButton}
                      alt="upload photo"
                      style={{ width: '100%', height: '100%', display: 'block' }}
                    />
                  </button>
                </>
              )}

              {view === 'camera' && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                  <TakePicture
                    ref={takePictureRef}
                    filter={filter === 'bw' ? 'grayscale(100%)' : 'none'}
                    onComplete={(capturedPhotos) => {
                      setPhotos(capturedPhotos)
                      setView('result')
                      setCameraStatus('black')
                    }}
                    onCountdownStart={() => setCameraStatus('red')}
                    onCapture={() => setCameraStatus('green')}
                    autoStart={shouldAutoStart}
                  />
                </div>
              )}
            </div>

            <div className="booth__controls">
              <button
                type="button"
                className="booth__start"
                onClick={handleStartCountdown}
                onMouseEnter={() => setHoveredButton('start')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
              >
                <img
                  src={hoveredButton === 'start' ? startButtonHover : startButton}
                  alt="start button"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              </button>

              <div className="booth__filters" role="group" aria-label="Photo filters">
                <button
                  type="button"
                  onClick={toggleFilter}
                  style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                >
                  <img
                    src={filter === 'color' ? colourSliderOn : colourSliderOff}
                    alt="colour filter"
                    className="booth__filter booth__filter--colour"
                  />
                </button>
                <button
                  type="button"
                  onClick={toggleFilter}
                  style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                >
                  <img
                    src={filter === 'bw' ? blackAndWhiteSliderOn : blackAndWhiteSliderOff}
                    alt="black and white filter"
                    className="booth__filter booth__filter--bw"
                  />
                </button>
              </div>
            </div>

            <img
              src={photoInstructions}
              alt="Step-by-step photo instructions"
              className="booth__instructions"
            />
          </>
        )}
      </div>
    </section>
  )
}

export default InsideBooth
