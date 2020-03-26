import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import styles from './layoutContainerCard.scss'

const LayoutContainerCard = ({ children }) => {
  return (
    <Animated
      animationIn="fadeIn"
      animationOut="fadeInUp"
      animationInDelay={1000}
      animationInDuration={500}
    >
      <div className={styles.containerLayout}>{children}</div>
    </Animated>
  )
}
LayoutContainerCard.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutContainerCard
