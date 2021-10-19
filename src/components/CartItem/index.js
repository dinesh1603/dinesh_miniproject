import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'
// import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
// import {AiFillCloseCircle} from 'react-icons/ai'
// import {BiRupee} from 'react-icons/bi'

import './index.css'
import EmptyCartView from '../EmptyCartView'

class CartItem extends Component {
  onIncrease = () => {
    const {foodItemList, updatedAddTotalAmount} = this.props
    const {fixedCost, foodId} = foodItemList

    const quantityEl = document.getElementById(`quantity${foodId}`)
    const costEl = document.getElementById(`cost${foodId}`)

    const quantityValue = parseInt(quantityEl.textContent, 10)
    if (quantityValue > 0) {
      const costValue = parseInt(costEl.textContent, 10)

      const updatedValue = quantityValue + 1
      const updatedCost = costValue + fixedCost

      quantityEl.textContent = updatedValue
      costEl.textContent = updatedCost

      updatedAddTotalAmount(fixedCost)
    }

    const setUpdatedDataInLocalStorage = value => {
      const eachData = value
      if (eachData.foodId === foodId) {
        eachData.foodCost += fixedCost
        eachData.quantity += 1
      }
    }
    if (quantityValue > 0) {
      const localStorageData = JSON.parse(localStorage.getItem('food_items'))

      localStorageData.forEach(setUpdatedDataInLocalStorage)

      localStorage.setItem('food_items', JSON.stringify(localStorageData))
    }
  }

  onDecrease = () => {
    const {foodItemList, updatedSubTotalAmount} = this.props
    const {foodId, fixedCost} = foodItemList

    const quantityEl = document.getElementById(`quantity${foodId}`)
    const costEl = document.getElementById(`cost${foodId}`)

    const quantityValue = parseInt(quantityEl.textContent, 10)
    if (quantityValue > 1) {
      const costValue = parseInt(costEl.textContent, 10)

      const updatedValue = quantityValue - 1
      const updatedCost = costValue - fixedCost

      quantityEl.textContent = updatedValue
      costEl.textContent = updatedCost

      updatedSubTotalAmount(fixedCost)
    }

    const setUpdatedDataInLocalStorage = value => {
      const eachData = value
      if (eachData.foodId === foodId) {
        eachData.foodCost -= fixedCost
        eachData.quantity -= 1
      }
    }
    if (quantityValue > 1) {
      const localStorageData = JSON.parse(localStorage.getItem('food_items'))

      localStorageData.forEach(setUpdatedDataInLocalStorage)

      localStorage.setItem('food_items', JSON.stringify(localStorageData))
    }
  }

  render() {
    const {foodItemList} = this.props
    const {foodId, foodImageUrl, foodName, foodCost, quantity} = foodItemList

    return (
      <>
        <ul className="cart-item-food-container">
          <li className="cart-food-item-image-and-name-container">
            <img
              src={foodImageUrl}
              alt={foodName}
              className="cart-food-item-image"
            />
          </li>
          <div className="description-container">
            <h1 className="cart-food-item-name">{foodName}</h1>

            <li className="cart-food-item-quantity-container">
              <button
                type="button"
                className="cart-food-quantity-button"
                onClick={this.onDecrease}
                testid="decrement-quantity"
              >
                -
              </button>
              <p id={`quantity${foodId}`} className="cart-food-quantity-text">
                {quantity}
              </p>
              <button
                type="button"
                className="cart-food-quantity-button"
                onClick={this.onIncrease}
                testid="increment-quantity"
              >
                +
              </button>
            </li>
            <li className="food-item-cost-container">
              <p className="cart-food-item-cost">
                <FaRupeeSign className="cart-item-rupee" />
                <span id={`cost${foodId}`}>{foodCost}</span>.00
              </p>
            </li>
          </div>
        </ul>
      </>
    )
  }
}

export default CartItem

/* <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
              
          </div>

            <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>





          <ul className="cart-item-food-mobile-container">
          <li className="cart-food-item-image-and-name-container">
            <img
              src={foodImageUrl}
              alt={foodName}
              className="cart-food-item-image"
            />
          </li>
          <div className="mobile-description-container">
            <h1 className="cart-food-item-name">{foodName}</h1>
            <li className="cart-food-item-quantity-container">
              <button
                type="button"
                className="cart-food-quantity-button"
                onClick={this.onDecrease}
              >
                -
              </button>
              <p id={`quantity${foodId}`} className="cart-food-quantity-text">
                {quantity}
              </p>
              <button
                type="button"
                className="cart-food-quantity-button"
                onClick={this.onIncrease}
              >
                +
              </button>
            </li>
            <li className="food-item-cost-container">
              <p className="cart-food-item-cost">
                <FaRupeeSign className="cart-item-rupee" />
                <span id={`cost${foodId}`}>{foodCost}</span>.00
              </p>
            </li>
          </div>
        </ul>
          */
