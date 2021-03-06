import {Component} from 'react'

import Loader from 'react-loader-spinner'
// import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import SimpleSlider from '../SimpleSlider'
import Header from '../Header'
import Footer from '../Footer'
import AllRestaurantsSection from '../AllRestaurantsSection'

import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {carouselData: [], isLoading: true}

  componentDidMount() {
    this.getCarouselData()
  }

  getCarouselData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    this.setState({carouselData: data.offers, isLoading: false})
  }

  renderLoadingSpinner = () => (
    <div className="home-loader-spinner-container">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderHomeComponents = () => {
    const {carouselData} = this.state

    return (
      <>
        <SimpleSlider carouselData={carouselData} />
        <AllRestaurantsSection className="all-restaurant-container" />
      </>
    )
  }

  render() {
    window.scrollTo(0, 0)

    const {isLoading} = this.state
    return (
      <>
        <Header choosen="home" />
        {isLoading ? this.renderLoadingSpinner() : this.renderHomeComponents()}
        <Footer />
      </>
    )
  }
}

export default Home
