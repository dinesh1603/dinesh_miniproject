import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

let cartFoodItemsList = []

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
    // console.log(`quantity ${quantity}`)

    // console.log(`props ${this.props}`)
    const {foodItemData} = this.props
    const {id, name, imageUrl, rating, cost} = foodItemData

    const onClickAdd = () => {
      this.setState({showAddButton: true})

      const foodItem = {
        foodId: id,
        foodCost: cost,
        fixedCost: cost,
        foodImageUrl: imageUrl,
        foodName: name,
        quantity: 1,
      }

      cartFoodItemsList = [...cartFoodItemsList, foodItem]

      localStorage.setItem('food_items', JSON.stringify(cartFoodItemsList))
      const addBtnEl = document.getElementById(`addBtn${id}`)
      addBtnEl.textContent = 'Add'
      // addBtnEl.disabled = false
    }

    return (
      <li className="restaurant-item" testid="foodItem">
        <img src={imageUrl} className="restaurant-item-image" alt={name} />
        <div className="restaurent-menu-container">
          <h1 className="restaurant-item-title">{name}</h1>
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
              <div className="increment-decrement-container">
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={this.onDecrementQuantity}
                  testid="decrement-count"
                >
                  <BsDashSquare className="quantity-controller-icon" />
                </button>
                <p className="quantity" testid="active-count">
                  {quantity}
                </p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={this.onIncrementQuantity}
                  testid="increment-count"
                >
                  <BsPlusSquare className="quantity-controller-icon" />
                </button>
              </div>

              {/* <button
                id={`addBtn${id}`}
                type="button"
                className="add-to-cart-button"
                onClick={onClickAdd}
                testid="increment-count"
              >
                Add
              </button>
            
            */}
            </div>
          ) : (
            <button
              type="button"
              id={`addBtn${id}`}
              className="add-button"
              onClick={onClickAdd}
            >
              Add
            </button>
          )}
        </div>
      </li>
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
