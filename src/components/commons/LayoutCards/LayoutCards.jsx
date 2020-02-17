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
  isButton: PropTypes.bool,
  width: PropTypes.string,
  margin: PropTypes.string,
}

LayoutCards.defaultProps = {
  isButton: false,
  width: '',
  margin: '',
}

export default LayoutCards
