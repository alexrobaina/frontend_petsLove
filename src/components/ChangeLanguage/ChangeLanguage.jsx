import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import c from 'classnames'
import { FaLanguage } from 'react-icons/fa'
import styles from './changeLanguage.scss'

const ChangeLanguage = () => {
  const [toggleMenu, setToggleMenu] = useState(true)
  const { i18n } = useTranslation()

  const handleSpanish = useCallback(() => {
    i18n.changeLanguage('es')
    moment.locale('es')
    setToggleMenu(true)
  }, [])

  const handleEnglish = useCallback(() => {
    i18n.changeLanguage('en')
    moment.locale('en')
    setToggleMenu(true)
  }, [])

  const handleBrazillianPortuguese = useCallback(() => {
    i18n.changeLanguage('pt-BR')
    moment.locale('pt-br')
    setToggleMenu(true)
  }, [])

  return (
    <>
      <div onClick={() => setToggleMenu(!toggleMenu)} className={styles.buttonMenu}>
        <FaLanguage size={38} />
      </div>
      <div
        onMouseLeave={() => setToggleMenu(true)}
        className={c(styles.containerMenu, toggleMenu && styles.viewMenu)}
      >
        <div className={styles.contentButtos}>
          <div onClick={handleEnglish} className={styles.buttons}>
            <div className={styles.text}>English</div>
          </div>
          <div onClick={handleSpanish} className={styles.buttons}>
            <div className={styles.text}>Spanish</div>
          </div>
          <div onClick={handleBrazillianPortuguese} className={styles.buttons}>
            <div className={styles.text}>Portuguese(BR)</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangeLanguage
