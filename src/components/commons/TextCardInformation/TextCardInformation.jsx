import React from 'react'
import PropTypes from 'prop-types'
import { GiWorld } from 'react-icons/gi'
import styles from './textCardInformation.scss'

const TextCardInformation = ({ text, value }) => {
  return (
    <div className={styles.containerData}>
      <div className={styles.iconTitle}>
        <div className={styles.icon}>
          <GiWorld classNa size={20} />
        </div>
        <div className={styles.title}>{text}:</div>
      </div>
      <div className={styles.infoTitle}>{value}</div>
    </div>
  )
}

TextCardInformation.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default TextCardInformation
