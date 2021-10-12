import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import RestaurantCard from '../RestaurantCard'
import RestaurantsHeader from '../RestaurantsHeader'

import './index.css'

const sortbyOptions = [
  {
    optionId: 'Highest',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'Lowest',
    displayText: 'Price (Low-High)',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllRestaurantsSection extends Component {
  state = {
    restaurantsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    limit: 10,
    offset: 0,
  }

  componentDidMount() {
    this.getRestaurants()

    this.onClickRightArrow()
    this.onClickLeftArrow()
  }

  getRestaurants = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, data, limit, activePage, offset} = this.state

    // const {offset} = (activePage - 1) * limit

    // const apiUrl ='https://apis.ccbp.in/restaurants-list?offset=0&limit=9&sort_by_rating=Highest'

    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=Highest`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedData = fetchedData.restaurants.map(restaurants => ({
        cuisine: restaurants.cuisine,
        id: restaurants.id,
        imageUrl: restaurants.image_url,
        name: restaurants.name,
        rating: restaurants.user_rating.rating,
      }))
      console.log(updatedData)
      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateActiceOptionId = activeOptionId => {
    this.setState(
      {
        activeOptionId,
      },
      this.getRestaurants,
    )
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurants)
  }

  renderFailureView = () => (
    <div className="restaurents-error-view-container">
      <h1 className="restaurents-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="restaurents-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderRestaurentsListView = () => {
    const {restaurantsList, activeOptionId} = this.state
    const shouldShowrestaurentsList = restaurantsList.length > 0

    return shouldShowrestaurentsList ? (
      <div className="all-restaurents-container">
        <RestaurantsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          updateActiceOptionId={this.updateActiceOptionId}
        />
        <ul className="restaurents-list">
          {restaurantsList.map(restaurantsListData => (
            <RestaurantCard
              restaurentData={restaurantsListData}
              key={restaurantsListData.id}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-restaurents-view">
        <img
          src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1632989083/OBJECTS_ghm6xj.png"
          className="no-restaurents-img"
          alt="no products"
        />
        <h1 className="no-restaurents-heading">No Restaurants Found</h1>
        <p className="no-restaurents-description">
          We could not find any restaurant.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="restaurents-loader-container">
      <Loader type="TailSpin" color="#FF8C00" height="50" width="50" />
    </div>
  )

  renderAllRestaurents = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurentsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onClickRightArrow = () => {
    this.setState(prevState => ({offset: prevState.offset + 10}))
    this.getRestaurants()
  }

  onClickLeftArrow = () => {
    this.setState(prevState => ({offset: prevState.offset - 10}))
    this.getRestaurants()
  }

  render() {
    // const {activeCategoryId, searchInput, activeRatingId} = this.state
    const {offset} = this.state
    return (
      <div className="all-restaurents-section">
        {this.renderAllRestaurents()}

        <div className="pagination-container">
          <button
            type="button"
            className="arrow-button"
            testid="pagination-left-button"
            onClick={this.onClickLeftArrow}
          >
            <IoIosArrowBack />
          </button>
          <p className="pagination-description" testid="active-page-number">
            {offset} of 30
          </p>
          <button
            type="button"
            className="arrow-button"
            testid="pagination-right-button"
            onClick={this.onClickRightArrow}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    )
  }
}

export default AllRestaurantsSection
