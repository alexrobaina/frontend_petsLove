import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import styles from './title.scss'

const Title = ({ title, subTitle, timeAnimation }) => (
  <Animated animationIn="fadeIn" animationInDelay={timeAnimation} animationOut="fadeIn" isVisible={true}>
  <div className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.subTitle}>{subTitle}</p>
  </div>
  </Animated>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  timeAnimation: PropTypes.number,
}

Title.defaultProps = {
  timeAnimation: 2
}

export default Title
