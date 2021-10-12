import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import SimpleSlider from '../SimpleSlider'
import Header from '../Header'
import Footer from '../Footer'
import AllRestaurantsSection from '../AllRestaurantsSection'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />

      <SimpleSlider />

      <div className="item-sections">
        <AllRestaurantsSection />
      </div>

      <Footer />
    </>
  )
}

export default Home
