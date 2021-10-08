import Slider from 'react-slick'
import './index.css'

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Slider {...settings} className="slide">
      <div>
        <img
          className="slide-image"
          src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-jammu-special.jpg"
          alt="offer"
        />
      </div>
      <div>
        <img
          className="slide-image"
          src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-rajasthani-special.jpg"
          alt="offer"
        />
      </div>
      <div>
        <img
          className="slide-image"
          src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-uttar-pradesh-special.jpg"
          alt="offer"
        />
      </div>
      <div>
        <img
          className="slide-image"
          src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-north-indian-special.jpg"
          alt="offer"
        />
      </div>
    </Slider>
  )
}

export default SimpleSlider
