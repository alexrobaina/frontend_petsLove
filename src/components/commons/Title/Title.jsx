import React from 'react'
import c from 'classnames'
import PropTypes from 'prop-types'
import styles from './title.scss'

const Title = ({ title, subTitle, withMargin, mTop, rolText, mBottom }) => {
  const marginTop = { marginTop: mTop, marginBottom: mBottom }

  return (
    <div style={marginTop} className={c(styles.container, withMargin && styles.withMargin)}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
      {rolText && <p className={styles.rolText}>{rolText}</p>}
    </div>
  )
}

Title.propTypes = {
  mTop: PropTypes.string,
  title: PropTypes.string,
  mBottom: PropTypes.string,
  rolText: PropTypes.string,
  subTitle: PropTypes.string,
  withMargin: PropTypes.string,
}

Title.defaultProps = {
  mBottom: '',
  mTop: '',
  title: '',
  rolText: '',
  subTitle: '',
  withMargin: '',
}

export default Title
