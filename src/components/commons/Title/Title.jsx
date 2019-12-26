import React from 'react'
import PropTypes from 'prop-types'
import styles from './title.module.scss'

const Title = ({ title, subTitle }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.subTitle}>{subTitle}</p>
  </div>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
}

export default Title
