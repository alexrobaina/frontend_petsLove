import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'

const LayoutTrantitions = ({ children }) => {
  return (
    <Animated
      animationIn="fadeIn"
      animationOut="fadeInUp"
      animationInDelay={1000}
      animationInDuration={500}
    >
      {children}
    </Animated>
  )
}

LayoutTrantitions.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutTrantitions
