import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import './index.css'

const Pagination = () => (
  <div className="pagination-container">
    <button
      type="button"
      className="arrow-button"
      testid="pagination-left-button"
    >
      <IoIosArrowBack />
    </button>
    <p className="pagination-description" testid="active-page-number">
      1 to 20
    </p>
    <button
      type="button"
      className="arrow-button"
      testid="pagination-right-button"
    >
      <IoIosArrowForward />
    </button>
  </div>
)

export default Pagination
