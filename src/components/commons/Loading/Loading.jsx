import React from 'react'
import { Animated } from 'react-animated-css'
import styles from './loading.scss'

const Loading = () => {
  return (
    <Animated
      animationIn="fadeIn"
      animationOut="fadeInUp"
      animationInDelay={1000}
      animationInDuration={500}
    >
      <div className={styles.heart}>
        <div />
      </div>
    </Animated>
  )
}

export default Loading
