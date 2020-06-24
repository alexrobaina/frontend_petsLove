import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import styles from './textCard.scss'
import LayoutCards from '../LayoutCards'

const TextCard = ({ title, text }) => {
  const { t } = useTranslation()
  
  return (
    <LayoutCards>
      <div className={styles.historyPets}>
        <div className={styles.titleHistory}>{title}</div>
        {text ? (
          <div className={styles.history}>{text}</div>
        ) : (
          <div className={styles.history}>{t('wasNotCompleted')}</div>
        )}
      </div>
    </LayoutCards>
  )
}

TextCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default observer(TextCard)
