import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaRupeeSign} from 'react-icons/fa'
import CartItem from '../CartItem'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'

import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  state = {totalAmount: 0, getFoodItemsData: null}

  componentDidMount() {
    const getFoodItemsList = localStorage.getItem('food_items')

    const foodItemsList = JSON.parse(getFoodItemsList)

    this.setState({getFoodItemsData: foodItemsList})
  }

  showTotalAmount = () => {
    const {getFoodItemsData} = this.state

    const amountList = getFoodItemsData.map(eachItem => eachItem.foodCost)

    const amount = amountList.reduce((a, b) => a + b)
    this.setState({totalAmount: amount})
  }

  updatedAddTotalAmount = amount => {
    this.setState(prevState => ({
      totalAmount: prevState.totalAmount + amount,
    }))
  }

  updatedSubTotalAmount = amount => {
    this.setState(prevState => ({
      totalAmount: prevState.totalAmount - amount,
    }))
  }

  onClickConfirm = () => {
    localStorage.removeItem('food_items')

    const {history} = this.props

    history.replace('/payment-successful')
  }

  orderNowClicked = () => {
    const {history} = this.props

    history.replace('/')
  }

  renderCartComponents = () => {
    const {totalAmount, getFoodItemsData} = this.state

    if (totalAmount === 0) {
      this.showTotalAmount()
    }

    return (
      <>
        <div className="cart-bg-container">
          <ul className="cart-header-container">
            <li className="cart-heading">Item</li>
            <li className="cart-heading">Quantity</li>
            <li className="cart-heading">Price</li>
          </ul>
          <div className="cart-food-items-container">
            {getFoodItemsData.map(eachItem => (
              <CartItem
                key={eachItem.foodId}
                foodItemList={eachItem}
                updatedAddTotalAmount={this.updatedAddTotalAmount}
                updatedSubTotalAmount={this.updatedSubTotalAmount}
              />
            ))}
          </div>
          <p className="cart-dashed-border">{}</p>
          <div className="cart-order-total-container">
            <h1 className="cart-order-total-text">Order Total:</h1>
            <h1 className="cart-order-total-amount">
              <FaRupeeSign className="cart-total-rupee" />
              {totalAmount}.00
            </h1>
          </div>
        </div>
        <div className="cart-confirm-button-container">
          <Link to="payment-successfull">
            <button
              type="button"
              className="confirm-order-button"
              onClick={this.onClickConfirm}
            >
              Place Order
            </button>
          </Link>
        </div>
      </>
    )
  }

  render() {
    const {getFoodItemsData} = this.state

    return (
      <>
        <Header />
        <div className="cart-container">
          {getFoodItemsData === null ? (
            <EmptyCartView />
          ) : (
            this.renderCartComponents()
          )}
        </div>
        <Footer />
      </>
    )
  }
}

export default Cart

/*


const showEmptyView = cartList.length === 0


value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

*/
