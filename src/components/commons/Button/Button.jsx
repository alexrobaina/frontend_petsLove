import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './button.scss'

const Button = ({ handleClick, text, circle, bigButton, icon, disable, type }) => {
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
        disabled={disable}
        className={c(styles.primary, bigButton && styles.bigButton)}
        type={type}
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  circle: PropTypes.bool,
  disable: PropTypes.bool,
}

Button.defaultProps = {
  circle: false,
  type: 'button',
  disable: false,
}

export default Button
