import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './button.scss'

const Button = ({ handleSearch, text, circle, bigButton, icon }) => {
  if (circle) {
    return (
      <button className={styles.btnCircle} type="button" onClick={handleSearch}>
        {icon}
      </button>
    )
  }
  return (
    <button
      className={c(styles.primary, bigButton && styles.bigButton)}
      type="button"
      onClick={handleSearch}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  circle: PropTypes.bool,
}

Button.defaultProps = {
  circle: false,
}

export default Button
