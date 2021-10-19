import {Link} from 'react-router-dom'
import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantItems from '../RestaurantItems'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantItemDetails extends Component {
  state = {
    restaurantData: {},
    restaurantItemsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
    buttonVisible: true,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getFormattedData = data => ({
    id: data.id,
    name: data.name,
    cuisine: data.cuisine,
    costForTwo: data.cost_for_two,
    reviewsCount: data.reviews_count,
    imageUrl: data.image_url,
    rating: data.rating,
    opensAt: data.opens_at,
    location: data.location,
    foodItems: data.food_items,

    itemRating: data.rating,
  })

  getFormattedFoodItemsData = data => {
    const foodItemsDetails = data.food_items.map(eachItem => ({
      id: eachItem.id,
      cost: eachItem.cost,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.rating,
    }))

    this.setState({restaurantItemsData: foodItemsDetails, isLoading: false})
  }

  getRestaurantData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // 'https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}'

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      this.getFormattedFoodItemsData(fetchedData)
      const updatedData = this.getFormattedData(fetchedData)
      console.log(updatedData)

      this.setState({
        restaurantData: updatedData,

        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div
      testid="restaurants-details-loader"
      className="products-details-loader-container"
    >
      <Loader type="TailSpin" color="#FF8C00#" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderRestaurantDetailsView = () => {
    const {
      restaurantData,

      restaurantItemsData,
    } = this.state

    const {
      id,
      name,
      cuisine,
      costForTwo,
      imageUrl,
      reviewsCount,
      rating,
      location,
    } = restaurantData

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt={name} className="product-image" />
          <div className="product">
            <h1 className="product-name">{name}</h1>
            <p className="cuisine-description">{cuisine}</p>
            <p className="location">{location}</p>
            <div className="review-and-cost-container">
              <div className="rating-and-reviews-count">
                <div className="rating-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star"
                  />
                  <p className="rating">{rating}</p>
                </div>
                <p className="reviews-count">{reviewsCount} Reviews</p>
              </div>
              <div className="cost-container">
                <p className="price-details">Rs {costForTwo}/-</p>
                <p className="cost-for-two">Cost for two</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="similar-products-list" testid="foodItem">
          {restaurantItemsData.map(eachItem => (
            <RestaurantItems foodItemData={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderRestaurantDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantItemDetails

/*
 <ul className="similar-products-list" testid="foodItem">
              {restaurantItemsData.map(eachItem => (
                <li className="restaurant-item" testid="restaurant-item">
                  <img
                    src={eachItem.imageUrl}
                    className="restaurant-item-image"
                    alt="restaurant"
                  />
                  <div className="restaurent-menu-container">
                    <p className="restaurant-item-title">{eachItem.name}</p>
                    <div className="rupee-icon-cost-container">
                      <BiRupee className="rupee-icon" />
                      <p className="restaurant-item-cost">{eachItem.cost}</p>
                    </div>
                    <div className="restaurant-item-price-rating-container">
                      <div className="restaurant-item-rating-container">
                        <img
                          src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1633148899/star_image_ynmj3g.png"
                          alt="star"
                          className="restaurant-item-star"
                        />
                        <p className="restaurant-item-rating">
                          {eachItem.rating}
                        </p>
                      </div>
                    </div>
                    <button type="button" className="add-button">
                      ADD
                    </button>

                    <div className="quantity-container">
                      <button
                        type="button"
                        className="quantity-controller-button"
                        onClick={this.onDecrementQuantity}
                        testid="minus"
                      >
                        <BsDashSquare className="quantity-controller-icon" />
                      </button>
                      <p className="quantity">{quantity}</p>
                      <button
                        type="button"
                        className="quantity-controller-button"
                        onClick={this.onIncrementQuantity}
                        testid="plus"
                      >
                        <BsPlusSquare className="quantity-controller-icon" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="button add-to-cart-btn"
                      onClick={onClickAddToCart}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </li>
              ))}
            </ul>






            <ul className="similar-products-list" testid="foodItem">
              {restaurantItemsData.map(eachItem => (
                <RestaurantItems productDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>









            <ul className="similar-products-list" testid="foodItem">
              {restaurantItemsData.map(eachItem => (
                <li className="restaurant-item" testid="restaurant-item">
                  <img
                    src={eachItem.imageUrl}
                    className="restaurant-item-image"
                    alt="restaurant"
                  />
                  <div className="restaurent-menu-container">
                    <p className="restaurant-item-title">{eachItem.name}</p>
                    <div className="rupee-icon-cost-container">
                      <BiRupee className="rupee-icon" />
                      <p className="restaurant-item-cost">{eachItem.cost}</p>
                    </div>
                    <div className="restaurant-item-price-rating-container">
                      <div className="restaurant-item-rating-container">
                        <img
                          src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1633148899/star_image_ynmj3g.png"
                          alt="star"
                          className="restaurant-item-star"
                        />
                        <p className="restaurant-item-rating">
                          {eachItem.rating}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => {
                        this.setState({buttonVisible: true})
                      }}
                    >
                      ADD
                    </button>
                    {this.setState.buttonVisible ? (
                      <div className="quantity-container">
                        <button
                          type="button"
                          className="quantity-controller-button"
                          onClick={this.onDecrementQuantity}
                          testid="minus"
                        >
                          <BsDashSquare className="quantity-controller-icon" />
                        </button>
                        <p className="quantity">{quantity}</p>
                        <button
                          type="button"
                          className="quantity-controller-button"
                          onClick={this.onIncrementQuantity}
                          testid="plus"
                        >
                          <BsPlusSquare className="quantity-controller-icon" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </li> key={eachItem.id} 
              ))}
            </ul>
            */
