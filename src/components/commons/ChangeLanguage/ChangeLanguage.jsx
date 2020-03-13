import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './changeLanguage.scss'

const ChangeLanguage = () => {
  const [language, setLenguage] = useState('')
  const { i18n } = useTranslation()

  useEffect(() => {
    const { languages } = navigator
    if (languages[0] === 'en') {
      setLenguage('English')
    }
    if (languages[0] === 'es') {
      setLenguage('Español')
    }
  }, [])

  const translate = () => {
    if (language === 'English') {
      setLenguage('Español')
      i18n.changeLanguage('es')
    }
    if (language === 'Español') {
      setLenguage('English')
      i18n.changeLanguage('en')
    }
  }

  return (
    <div onClick={() => translate()} className={styles.textLanguage}>
      {language}
    </div>
  )
}

export default ChangeLanguage
