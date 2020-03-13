import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from './changeLanguage.scss'

const ChangeLanguage = () => {
  const [language, setLenguage] = useState('English')
  const { i18n } = useTranslation()

  useEffect(() => {
    const languages = navigator.languages
    if (languages === 'Español') {
      setLenguage('Español')
    }
    if (languages === 'English') {
      setLenguage('English')
    }
  }, [])

  const translate = () => {
    if (language === 'es') {
      i18n.changeLanguage('Español')
      setLenguage('Español')
    }
    if (language === 'en') {
      i18n.changeLanguage('English')
      setLenguage('English')
    }
  }

  return (
    <div onClick={() => translate()} className={styles.textLanguage}>
      {language}
    </div>
  )
}
//
// ChangeLanguage.propTypes = {
//   language: PropTypes.string.isRequired,
// }

export default ChangeLanguage
