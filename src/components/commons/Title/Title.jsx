import React from 'react'
import c from 'classnames'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'
import styles from './title.scss'
import { useTranslation } from 'react-i18next'

const Title = ({ title, subTitle, withMargin, mTop, rolText }) => {
  const marginTop = { marginTop: mTop }

  return (
    <div style={marginTop} className={c(styles.container, withMargin && styles.withMargin)}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
      {rolText && <p className={styles.rolText}>{rolText}</p>}
    </div>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  rolText: PropTypes.string,
  subTitle: PropTypes.string,
  withMargin: PropTypes.string,
  mTop: PropTypes.string,
}

Title.defaultProps = {
  title: '',
  subTitle: '',
  rolText: '',
  withMargin: '',
  mTop: '',
}

export default Title
