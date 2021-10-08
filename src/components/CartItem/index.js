import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {
        id,
        costForTwo,
        cuisine,
        name,
        quantity,
        imageUrl,
        cost,
      } = cartItemDetails
      const onClickDecrement = () => {
        decrementCartItemQuantity(id)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(id)
      }
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }
      const totalPrice = costForTwo * quantity

      return (
        <li className="cart-item">
          <div className="cart-list-items">
            <img className="cart-product-image" src={imageUrl} alt={cuisine} />
            <div className="cart-item-details-container">
              <div className="cart-product-title-brand-container">
                <p className="cart-product-title">{cuisine}</p>
                <p className="cart-product-brand">by {name}</p>
              </div>
            </div>
          </div>
          <div className="cart-quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              testid="decrement-quantity"
              onClick={onClickDecrement}
            >
              <BsDashSquare color="#52606D" size={12} />
            </button>
            <p className="cart-quantity">{quantity}</p>
            <button
              type="button"
              className="quantity-controller-button"
              testid="increment-quantity"
              onClick={onClickIncrement}
            >
              <BsPlusSquare color="#52606D" size={12} />
            </button>
          </div>
          <div className="total-price-remove-container">
            <p className="cart-total-price">
              <BiRupee />
              {totalPrice}.00
            </p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

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
          */
