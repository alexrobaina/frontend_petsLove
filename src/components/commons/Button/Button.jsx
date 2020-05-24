import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './button.scss'

const Button = ({ handleClick, text, circle, bigButton, icon, disable, isTransparent }) => {
  if (circle) {
    return (
      <div className={c(styles.containerButton, isTransparent && styles.transparent)}>
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
        type="button"
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  circle: PropTypes.bool,
  bigButton: PropTypes.bool,
  isTransparent: PropTypes.bool,
  icon: PropTypes.node,
  disable: PropTypes.bool,
}

Button.defaultProps = {
  icon: null,
  circle: false,
  isTransparent: false,
  bigButton: false,
  disable: false,
}

export default Button
