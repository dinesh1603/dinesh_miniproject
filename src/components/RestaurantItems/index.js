import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

import CartContext from '../../context/CartContext'

class RestaurantItems extends Component {
  state = {
    quantity: 1,
    showAddButton: false,
    productDetails: [],
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    const {quantity, showAddButton} = this.state
    // console.log(`props ${this.props}`)
    const {productDetails} = this.props

    return (
      <CartContext.Consumer>
        {value => {
          const {itemName, imageUrl, rating, cost} = productDetails
          const {addCartItem} = value

          const onClickAddToCart = () => {
            this.onIncrementQuantity()
            addCartItem({...productDetails, quantity})
          }

          return (
            <li className="restaurant-item" testid="restaurant-item">
              <img
                src={imageUrl}
                className="restaurant-item-image"
                alt="restaurant"
              />
              <div className="restaurent-menu-container">
                <p className="restaurant-item-title">{itemName}</p>
                <div className="rupee-icon-cost-container">
                  <BiRupee className="rupee-icon" />
                  <p className="restaurant-item-cost">{cost}</p>
                </div>
                <div className="restaurant-item-price-rating-container">
                  <div className="restaurant-item-rating-container">
                    <img
                      src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1633148899/star_image_ynmj3g.png"
                      alt="star"
                      className="restaurant-item-star"
                    />
                    <p className="restaurant-item-rating">{rating}</p>
                  </div>
                </div>

                {showAddButton ? (
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
                      onClick={onClickAddToCart}
                      // onClick={this.onIncrementQuantity}
                      testid="plus"
                    >
                      <BsPlusSquare className="quantity-controller-icon" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => {
                      this.setState({showAddButton: true})
                    }}
                  >
                    ADD
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default RestaurantItems

/*

<CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onClickAddToCart = () => {
          setQuantity(quantity + 1)
          addCartItem({...productDetails, quantity})
        }

        return (
          <li className="restaurant-item" testid="restaurant-item">
            <img
              src={imageUrl}
              className="restaurant-item-image"
              alt="restaurant"
            />
            <div className="restaurent-menu-container">
              <p className="restaurant-item-title">{name}</p>
              <div className="rupee-icon-cost-container">
                <BiRupee className="rupee-icon" />
                <p className="restaurant-item-cost">{cost}</p>
              </div>
              <div className="restaurant-item-price-rating-container">
                <div className="restaurant-item-rating-container">
                  <img
                    src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1633148899/star_image_ynmj3g.png"
                    alt="star"
                    className="restaurant-item-star"
                  />
                  <p className="restaurant-item-rating">{rating}</p>
                </div>
              </div>

              {showAddButton ? (
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={() => setQuantity(quantity - 1)}
                    testid="minus"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={onClickAddToCart}
                    // onClick={() => setQuantity(quantity + 1)}
                    testid="plus"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="add-button"
                  onClick={() => setShowAddButton(!showAddButton)}
                >
                  ADD
                </button>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>


    */
