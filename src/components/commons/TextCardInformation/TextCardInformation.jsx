import React from 'react'
import PropTypes from 'prop-types'
import styles from './textCardInformation.scss'

const TextCardInformation = ({ text, informationPet, value, icon }) => {
  return (
    <div className={styles.containerData}>
      <div className={styles.iconTitle}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{text}:</div>
      </div>
      {informationPet === true && <div className={styles.infoTitle}>Si</div>}
      {informationPet === false && <div className={styles.infoTitle}>No</div>}
      {value && <div className={styles.infoTitle}>{value}</div>}
    </div>
  )
}

TextCardInformation.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  informationPet: PropTypes.bool,
}

TextCardInformation.defaultProps = {
  informationPet: false,
}

export default TextCardInformation
