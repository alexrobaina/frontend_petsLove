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
        type="button"
        disabled={disable}
        onClick={handleClick}
        className={c(styles.primary, bigButton && styles.bigButton)}
      >
        {text}
      </button>
    </div>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  circle: PropTypes.bool,
  bigButton: PropTypes.bool,
  isTransparent: PropTypes.bool,
  icon: PropTypes.node,
  disable: PropTypes.bool,
}

Button.defaultProps = {
  text: '',
  icon: null,
  circle: false,
  disable: false,
  bigButton: false,
  isTransparent: false,
}

export default Button
