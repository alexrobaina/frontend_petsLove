import React from 'react'
import c from 'classnames'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import styles from './title.scss'

const Title = ({ title, subTitle, timeAnimation, withMargin, mTop }) => {
  const marginTop = { marginTop: mTop }

  return (
    <Animated animationIn="fadeIn" animationInDelay={timeAnimation} animationOut="fadeIn" isVisible>
      <div style={marginTop} className={c(styles.container, withMargin && styles.withMargin)}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subTitle}>{subTitle}</p>
      </div>
    </Animated>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  timeAnimation: PropTypes.number,
}

Title.defaultProps = {
  timeAnimation: 2,
  title: 'Pets Love',
  subTitle: '',
}

export default Title
