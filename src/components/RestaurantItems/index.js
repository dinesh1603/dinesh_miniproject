import {useState, useEffect} from 'react'
import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

import CartContext from '../../context/CartContext'

const RestaurantItems = props => {
  const {productDetails} = props
  const {name, imageUrl, rating, cost} = productDetails
  const [quantity, setQuantity] = useState(0)

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

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
              {/* <button type="button" className="add-button">
          ADD
        </button>
        */}
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
                  onClick={() => setQuantity(quantity + 1)}
                  testid="plus"
                >
                  <BsPlusSquare className="quantity-controller-icon" />
                </button>
              </div>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default RestaurantItems
