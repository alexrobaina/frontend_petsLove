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
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        {text ? (
          <div className={styles.text}>{text}</div>
        ) : (
          <div className={styles.text}>{t('wasNotCompleted')}</div>
        )}
      </div>
    </LayoutCards>
  )
}

TextCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
}

TextCard.defaultProps = {
  text: '',
}

export default observer(TextCard)
