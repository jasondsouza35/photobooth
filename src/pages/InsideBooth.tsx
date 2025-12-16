import curtainLeft from '../assets/camera/curtain/Vector 232.svg'
import curtainRight from '../assets/camera/curtain/Vector 233.svg'
import cameraState from '../assets/camera/camera_states/camera_black.svg'
import cameraFrame from '../assets/camera/camera_frame.svg'
import takePictureButton from '../assets/camera/take_picture.svg'
import uploadPhotoButton from '../assets/camera/upload_photo.svg'
import startButton from '../assets/camera/start_button.svg'
import colourSliderOff from '../assets/camera/sliders/colour_slider_off.svg'
import blackAndWhiteSliderOn from '../assets/camera/sliders/black_and_white_slider_on.svg'
import photoInstructions from '../assets/camera/photo_instructions.svg'

const InsideBooth = () => (
  <section className="booth__scene" aria-label="Photobooth interior">
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

    <div className="booth__camera-head">
      <img src={cameraState} alt="Camera lens and indicator" />
    </div>

    <div className="booth__screen">
      <img src={cameraFrame} alt="Camera frame" className="booth__screen-frame" />
      <img
        src={takePictureButton}
        alt="take a picture"
        className="booth__screen-action booth__screen-action--top"
      />
      <img
        src={uploadPhotoButton}
        alt="upload photo"
        className="booth__screen-action booth__screen-action--bottom"
      />
    </div>

    <img src={startButton} alt="start button" className="booth__start" />

    <div className="booth__filters" role="group" aria-label="Photo filters">
      <img src={colourSliderOff} alt="colour filter" className="booth__filter booth__filter--colour" />
      <img src={blackAndWhiteSliderOn} alt="black and white filter" className="booth__filter booth__filter--bw" />
    </div>

    <img
      src={photoInstructions}
      alt="Step-by-step photo instructions"
      className="booth__instructions"
    />
  </section>
)

export default InsideBooth
