import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import styles from './layoutContainer.scss'

const LayoutContainer = ({ title, children }) => {
  return (
    <Animated
      animationIn="fadeIn"
      animationOut="fadeInUp"
      animationInDelay={1000}
      animationInDuration={500}
    >
      <div className={styles.containerLayout}>
        <div className={styles.title}>{title}</div>
        {children}
      </div>
    </Animated>
  )
}

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

LayoutContainer.defaultProps = {
  title: '',
}

export default LayoutContainer
