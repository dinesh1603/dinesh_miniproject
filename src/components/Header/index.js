import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'

import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const [show, setShow] = useState(false)

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <div className="mobile-logo-container">
            <Link to="/">
              <img
                className="website-mobile-logo"
                src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1632986851/Tasty_Kitchen_lc3zjq.png"
                alt="website logo"
              />
            </Link>
            <h1 className="website-logo-mobile-heading">Tasty Kitchen</h1>
          </div>

          <button
            type="button"
            className="hamburgerIconButton"
            data-testid="hamburgerIconButton"
            onClick={() => setShow(!show)}
          >
            <GiHamburgerMenu size="30" />
          </button>
        </div>
        {show ? (
          <div className="ModalContainer">
            <ul className="NavLinksList">
              <li className="mobile-nav-list-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="mobile-nav-list-item">
                <Link to="/cart" className="nav-link">
                  Cart
                  {renderCartItemsCount()}
                </Link>
              </li>
              <button
                type="button"
                className="mobile-nav-list-item-button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </ul>
            <button
              className="CloseButton"
              type="button"
              data-testid="closeButton"
              onClick={() => setShow(!show)}
            >
              <IoMdClose size="30" color="#616e7c" />
            </button>
          </div>
        ) : null}
        <div className="nav-bar-large-container">
          <div className="logo-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1632986851/Tasty_Kitchen_lc3zjq.png"
                alt="website logo"
              />
            </Link>
            <h1 className="website-logo-heading">Tasty Kitchen</h1>
          </div>

          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
