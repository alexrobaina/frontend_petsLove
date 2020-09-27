import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import styles from './textCard.scss'

const TextCard = ({ text }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.containerText}>
      {text ? (
        <div className={styles.text}>{text}</div>
      ) : (
        <div className={styles.text}>{t('wasNotCompleted')}</div>
      )}
    </div>
  )
}

TextCard.propTypes = {
  text: PropTypes.string,
}

TextCard.defaultProps = {
  text: '',
}

export default observer(TextCard)
