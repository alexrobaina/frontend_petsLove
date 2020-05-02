import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './button.scss'

const Button = ({ handleClick, text, circle, bigButton, icon }) => {
  if (circle) {
    return (
      <div className={styles.containerButton}>
        <button className={styles.btnCircle} type="button" onClick={handleClick}>
          {icon}
        </button>
      </div>
    )
  }
  return (
    <div className={styles.containerButton}>
      <button
        className={c(styles.primary, bigButton && styles.bigButton)}
        type="button"
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  circle: PropTypes.bool,
}

Button.defaultProps = {
  circle: false,
}

export default Button
