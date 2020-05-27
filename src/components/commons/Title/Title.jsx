import React from 'react'
import c from 'classnames'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import styles from './title.scss'

const Title = ({ title, subTitle, timeAnimation, withMargin, mTop, rolText }) => {
  const marginTop = { marginTop: mTop }

  return (
    <Animated animationIn="fadeIn" animationInDelay={timeAnimation} animationOut="fadeIn" isVisible>
      <div style={marginTop} className={c(styles.container, withMargin && styles.withMargin)}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
        {rolText && <p className={styles.rolText}>{rolText}</p>}
      </div>
    </Animated>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  rolText: PropTypes.string,
  subTitle: PropTypes.string,
  timeAnimation: PropTypes.number,
  withMargin: PropTypes.string,
  mTop: PropTypes.string,
}

Title.defaultProps = {
  timeAnimation: 2,
  title: '',
  subTitle: '',
  rolText: '',
  withMargin: '',
  mTop: '',
}

export default Title
