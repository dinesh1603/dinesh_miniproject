// import {AiOutlineTwitter} from 'react-icons/ai'
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaPinterestSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-large-container">
    <div className="logo-container">
      <img
        className="white-logo"
        src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1633076174/tasty_kitchen_white_logo_r8q3i5.png"
        alt="website-footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchen</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>

    <div className="social-media-container">
      <FaPinterestSquare
        className="social-icon"
        testid="pintrest-social-icon"
      />
      <FaInstagram className="social-icon" testid="instagram-social-icon" />
      <FaTwitter className="social-icon" testid="twitter-social-icon" />
      <FaFacebookSquare className="social-icon" testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer
