import Slider from 'react-slick'
import './index.css'

const SimpleSlider = props => {
  const {carouselData} = props

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  }

  return (
    <Slider {...settings} className="carousel-container">
      {carouselData.map(eachData => (
        <img
          src={eachData.image_url}
          className="carousel-images"
          alt="restaurant offers"
          key={eachData.id}
        />
      ))}
    </Slider>
  )
}

export default SimpleSlider
