import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLink from 'components/commons/ButtonLink'

const ChangeLanguage = () => {
  const [language, setLenguage] = useState('')
  const { i18n } = useTranslation()
  // I think this code is very terrible, if someone have good idea please refactor
  const translate = () => {
    if (language === 'English') {
      setLenguage('Español')
      i18n.changeLanguage('en')
      localStorage.setItem('languageUser', 'en')
    }
    if (language === 'Español') {
      setLenguage('English')
      i18n.changeLanguage('es')
      localStorage.setItem('languageUser', 'es')
    }
  }

  useEffect(() => {
    const { languages } = navigator
    const languageUser = localStorage.getItem('languageUser')

    if (languageUser === 'en') {
      setLenguage('Español')
      i18n.changeLanguage('en')
    } else if (languages[1] === 'en' || languages[0] === 'en-US') {
      setLenguage('Español')
      i18n.changeLanguage('en')
    }

    if (languageUser === 'es') {
      setLenguage('English')
      i18n.changeLanguage('es')
    } else if (languages[1] === 'es' || languages[0] === 'es-ES' || languageUser === 'es') {
      setLenguage('English')
    }
  }, [])

  return <ButtonLink onclick={translate} text={language} />
}

export default ChangeLanguage
