import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      const onclickEmptyCart = () => {
        console.log('onclickEmptyCart Clicked')
      }
      return (
        <>
          <div className="cart-summary-container">
            <hr />
            <div className="total-order-value-container">
              <h1 className="order-total-label">Order Total:</h1>
              <h1 className="order-total-value">
                <BiRupee className="rupee-icon" />
                {total}.00
              </h1>
            </div>
            <div className="button-container">
              <Link to="/payment-successfull">
                <button type="button" className="checkout-button d-sm-none">
                  Place Order
                </button>
              </Link>
            </div>
            <Link to="/payment-successfull" onClick={onclickEmptyCart}>
              <button type="button" className="checkout-button d-lg-none">
                Order Now
              </button>
            </Link>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
