import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
// import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import RestaurantCard from '../RestaurantCard'
import RestaurantsHeader from '../RestaurantsHeader'
import Pagination from '../Pagination'
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
    restaurantsListData: [],
    isLoading: true,
    firstPage: 1,
    lastPage: 0,
    sortByValue: '',
  }

  componentDidMount() {
    this.getRestaurantListData()
  }

  convertResponseData = data => {
    const restaurantListData = data.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      cuisine: eachData.cuisine,
      imageUrl: eachData.image_url,
      rating: eachData.user_rating.rating,
      totalReviews: eachData.user_rating.total_reviews,
    }))

    this.setState({
      restaurantsListData: restaurantListData,
      isLoading: false,
    })
  }

  onSortOptionsSelected = value => {
    this.setState({sortByValue: value}, this.getRestaurantListData)
  }

  onPaginationButtonClicked = pageNo => {
    this.setState({firstPage: pageNo}, this.getRestaurantListData)
  }

  getRestaurantListData = async () => {
    const {firstPage, sortByValue} = this.state

    const LIMIT = 9
    const activePage = 9 * firstPage
    const offset = activePage - 1 * LIMIT

    const selectedSortValue = sortByValue

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    let apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}`
    if (sortByValue !== '') {
      apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortValue}`
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    this.convertResponseData(data.restaurants)
    this.setState({lastPage: Math.ceil(data.total / 9)})
  }

  renderLoadingSpinner = () => (
    <div className="restaurant-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderRestaurantListComponents = () => {
    const {restaurantsListData, firstPage, lastPage} = this.state

    return (
      <>
        <div className="restaurant-list-item-container">
          {restaurantsListData.map(eachItem => (
            <RestaurantCard key={eachItem.id} restaurantListData={eachItem} />
          ))}
        </div>
        <Pagination
          firstPage={firstPage}
          lastPage={lastPage}
          onPaginationButtonClicked={this.onPaginationButtonClicked}
        />
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <div className="header-container">
          <RestaurantsHeader
            onSortOptionsSelected={this.onSortOptionsSelected}
          />
        </div>
        {isLoading
          ? this.renderLoadingSpinner()
          : this.renderRestaurantListComponents()}
      </>
    )
  }
}

export default AllRestaurantsSection
