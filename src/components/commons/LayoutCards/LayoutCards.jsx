import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './layoutCards.scss'

const LayoutCards = ({ children, isButton, width, margin }) => {
  const stylesCustom = {
    width,
    margin,
  }
  return (
    <div style={stylesCustom} className={c(styles.containerCard, isButton && styles.isButton)}>
      {children}
    </div>
  )
}

LayoutCards.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string.isRequired,
  isButton: PropTypes.bool,
}

LayoutCards.defaultProps = {
  isButton: false,
}

export default LayoutCards
