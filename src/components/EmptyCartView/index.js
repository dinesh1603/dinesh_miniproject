import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1632989083/OBJECTS_ghm6xj.png"
      className="cart-empty-image"
      alt="empty cart"
    />
    <h1 className="cart-empty-heading">No Order Yet!</h1>
    <p className="">Your cart is empty. Add something from the menu.</p>

    <Link to="/">
      <button type="button" className="shop-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
