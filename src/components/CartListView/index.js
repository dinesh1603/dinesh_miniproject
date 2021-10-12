import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView

/*
const cartList = [
  {
    name: 'Kaju biriyani',
    cost: 750,
    food_type: 'VEG',
    image_url:
      'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-1/kaju-biriyani-1.jpg',
    id: '1a578964-b949-495a-acef-e9e050cb274c',
    rating: 4,
  },
  {
    name: 'Mashroom Biriyani',
    cost: 600,
    food_type: 'VEG',
    image_url:
      'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-1/mashroom-biriyani-2.jpg',
    id: '6bbbccc9-5cc8-45a1-a6ed-b3207de0ac9d',
    rating: 3.4,
  },
  {
    name: 'Chicken Kolhapuri',
    cost: 600,
    food_type: 'NON-VEG',
    image_url:
      'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-1/chicken-kolhapuri-3.jpg',
    id: 'bd164da0-ea7f-47fb-9a3c-1d5342c52579',
    rating: 4.4,
  },
  {
    name: 'Chicken Corn',
    cost: 650,
    food_type: 'NON-VEG',
    image_url:
      'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-1/chicken-corn-4.jpg',
    id: '20456009-484c-4895-b4cb-ddc85507f9f4',
    rating: 4,
  },
]
*/
