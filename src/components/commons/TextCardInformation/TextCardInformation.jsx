import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from './textCardInformation.scss'

const TextCardInformation = ({ text, value, icon }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.containerData}>
      <div className={styles.iconTitle}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{text}</div>
      </div>
      {value === true && <div className={styles.infoTitle}>{t('common:yes')}</div>}
      {value === false && <div className={styles.infoTitle}>{t('common:no')}</div>}
      {value !== '' && typeof value !== 'boolean' && <div className={styles.infoTitle}>{value}</div>}
      {value === '' && <div className={styles.infoTitle}>{t('thereIsNoInformation')}</div>}
    </div>
  )
}

TextCardInformation.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.bool),
}

TextCardInformation.defaultProps = {
  value: '',
}

export default TextCardInformation
