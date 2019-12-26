import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.scss'

const Button = ({ type, handleSearch, text }) => {
  return (
    <button className={styles.primary} type={type} onClick={handleSearch}>
      {text}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  styleButton: PropTypes.string.isRequired,
}

Button.defaultProps = {
  type: 'button',
}

export default Button
