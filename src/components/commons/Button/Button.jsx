import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { MdSearch } from 'react-icons/md'
import styles from './button.scss'

const Button = ({ type, handleSearch, text, circle, bigButton }) => {
  if (circle) {
    return (
      <button className={styles.btnCircle} type={type} onClick={handleSearch}>
        <MdSearch size={18} />
      </button>
    )
  }
  return (
    <button className={c(styles.primary, bigButton && styles.bigButton)} type={type} onClick={handleSearch}>
      {text}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  circle: PropTypes.bool,
}

Button.defaultProps = {
  type: 'button',
  circle: false,
}

export default Button
