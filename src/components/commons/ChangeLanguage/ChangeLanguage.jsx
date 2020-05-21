import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLink from 'components/commons/ButtonLink'
import c from 'classnames'
import styles from '../MenuProfile/menuProfile.scss'
import { FaLanguage, FaUser } from 'react-icons/fa'
import { IoMdLogOut } from 'react-icons/io'
import Button from '../Button'
import { MdLanguage } from 'react-icons/md'

const ChangeLanguage = () => {
  const [toggleMenu, setToggleMenu] = useState(true)
  const { i18n } = useTranslation()

  const handleSpanish = useCallback(() => {
    i18n.changeLanguage('es')
    setToggleMenu(true)
  }, [])

  const handleEnglish = useCallback(() => {
    i18n.changeLanguage('en')
    setToggleMenu(true)
  }, [])

  return (
    <>
      <div onClick={() => setToggleMenu(!toggleMenu)} className={styles.buttonMenu}>
        <MdLanguage size={24} />
      </div>
      <div className={styles.containerLanguage}>
        <div className={c(styles.containerMenu, toggleMenu && styles.viewMenu)}>
          <div className={styles.contentButtos}>
            <div onClick={handleEnglish} className={styles.buttons}>
              <div className={styles.text}>English</div>
            </div>
            <div onClick={handleSpanish} className={styles.buttons}>
              <div className={styles.text}>Spanish</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangeLanguage
