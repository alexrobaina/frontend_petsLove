import React, { useState, useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { useTranslation } from 'react-i18next'
import { FiFilter } from 'react-icons/fi'
import { useHistory } from 'react-router'
import { LOGIN, REGISTER } from 'routing/routes'
import { MdClose } from 'react-icons/md'
import ChangeLanguage from 'components/commons/ChangeLanguage'
import UserContext from 'Context/UserContext'
import ButtonLink from 'components/commons/ButtonLink'
import FilterNavbar from 'components/FilterNavbar'
import MenuProfile from 'components/commons/MenuProfile'
import ImageUserLog from 'components/commons/ImageUserLog'
import ButtonIcon from 'components/commons/ButtonIcon'
import styles from './navbar.scss'

const Navbar = ({ searchPetsStore, optionsSelectsStore }) => {
  const rootStore = useContext(UserContext)
  const [toggle, setToggle] = useState(false)
  const [viewMenuProfile, setViewMenuProfile] = useState(true)
  const { t } = useTranslation()
  const history = useHistory()

  const goToLogin = useCallback(() => history.push(LOGIN))
  const goToRegister = useCallback(() => history.push(REGISTER))

  const handleToggle = useCallback(() => {
    setToggle(!toggle)
  })

  const handleToggleMenu = useCallback(() => {
    setViewMenuProfile(!viewMenuProfile)
  })

  useEffect(() => {
    if (!viewMenuProfile) {
      setTimeout(() => {
        setViewMenuProfile(true)
      }, 3500)
    }
  }, [viewMenuProfile])

  return (
    <>
      <div className={styles.containerNavbar}>
        <ButtonIcon onclick={handleToggle} icon={<FiFilter size={25} />} />
        {rootStore.authStore.isLogin ? (
          <div className={styles.containerProfile}>
            <div className={styles.contectImageUser}>
              <MenuProfile handleToggleMenu={handleToggleMenu} viewMenuProfile={viewMenuProfile} />
              <ImageUserLog
                handleToggleMenu={handleToggleMenu}
                isUserLogin={rootStore.authStore.isLogin}
              />
            </div>
            <div>
              <ChangeLanguage />
            </div>
          </div>
        ) : (
          <div className={styles.containerButtonslog}>
            <ButtonLink onclick={goToLogin} text={t('navbar.login')} />
            <ButtonLink onclick={goToRegister} text={t('navbar.singIn')} />
            <ChangeLanguage />
          </div>
        )}
      </div>
      <div className={c(toggle ? styles.open : styles.showMenu)}>
        <ButtonIcon onclick={handleToggle} icon={<MdClose size={25} />} />
        <div className={styles.titleNavbar}>
          <div>{t('navbar.moreFilters')}</div>
        </div>
        <div className={styles.containerSelects}>
          <FilterNavbar
            handleToggle={handleToggle}
            optionsSelectsStore={optionsSelectsStore}
            searchPetsStore={searchPetsStore}
          />
        </div>
      </div>
      <div className={c(toggle && styles.showShadowBack)} onClick={() => setToggle(!toggle)} />
    </>
  )
}

Navbar.propTypes = {
  searchPetsStore: PropTypes.node.isRequired,
  optionsSelectsStore: PropTypes.node.isRequired,
}

export default Navbar
