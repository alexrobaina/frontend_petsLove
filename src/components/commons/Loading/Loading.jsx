import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import c from 'classnames'
import styles from './loading.scss'

const Loading = ({ small }) => {
  return (
    <Animated
      animationIn="fadeIn"
      animationOut="fadeInUp"
      animationInDelay={1000}
      animationInDuration={500}
    >
      <div className={c(styles.heart, small && styles.small)}>
        <div />
      </div>
    </Animated>
  )
}

Loading.propTypes = {
  small: PropTypes.bool,
}

Loading.defaultProps = {
  small: false,
}

export default Loading
