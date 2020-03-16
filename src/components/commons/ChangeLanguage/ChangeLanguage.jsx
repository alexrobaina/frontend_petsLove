import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './changeLanguage.scss'

const ChangeLanguage = () => {
  const [language, setLenguage] = useState('')
  const { i18n } = useTranslation()

  useEffect(() => {
    const { languages } = navigator
    console.log(languages)
    if (languages[1] === 'en' || languages[0] === 'en-US') {
      setLenguage('Español')
    }
    if (languages[1] === 'es' || languages[0] === 'es-ES') {
      setLenguage('English')
    }
  }, [])

  const translate = () => {
    if (language === 'English') {
      setLenguage('Español')
      i18n.changeLanguage('en')
    }
    if (language === 'Español') {
      setLenguage('English')
      i18n.changeLanguage('es')
    }
  }

  return (
    <div onClick={() => translate()} className={styles.textLanguage}>
      {language}
    </div>
  )
}

export default ChangeLanguage
