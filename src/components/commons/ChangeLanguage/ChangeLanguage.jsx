import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLink from 'components/commons/ButtonLink'

const ChangeLanguage = () => {
  const [language, setLenguage] = useState('')
  const { i18n } = useTranslation()

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

  useEffect(() => {
    const { languages } = navigator

    if (languages[1] === 'en' || languages[0] === 'en-US') {
      setLenguage('Español')
    }
    if (languages[1] === 'es' || languages[0] === 'es-ES') {
      setLenguage('English')
    }
  }, [])

  return <ButtonLink onclick={translate} text={language} />
}

export default ChangeLanguage
