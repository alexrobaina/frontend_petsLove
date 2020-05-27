import React, { useState, useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import { MdSearch } from 'react-icons/md'
import { HOME, LOGIN, REGISTER } from 'routing/routes'
import ChangeLanguage from 'components/commons/ChangeLanguage'
import UserContext from 'Context/UserContext'
import Footer from 'components/commons/Footer'
import ButtonLink from 'components/commons/ButtonLink'
import MenuProfile from 'components/commons/MenuProfile'
import ImageUserLog from 'components/commons/ImageUserLog'
import ButtonIcon from 'components/commons/ButtonIcon'
import Loading from '../Loading/Loading'
import ToggleMenuUser from './ToggleMenuUser/ToggleMenuUser'
import styles from './navbar.scss'

const Navbar = ({ children }) => {
  const { t } = useTranslation('navbar')
  const history = useHistory()
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const [toggleNavegationUser, setToggleNavegationUser] = useState(false)
  const [viewMenuProfile, setViewMenuProfile] = useState(true)

  const goToLogin = useCallback(() => history.push(LOGIN))
  const goToRegister = useCallback(() => history.push(REGISTER))

  const handleToggleMenu = useCallback(() => {
    setViewMenuProfile(!viewMenuProfile)
  })

  const handleMenu = useCallback((link, id, haveId) => {
    if (haveId) {
      history.push(`${link}/${id}`)
    } else {
      history.push(link)
    }
  }, [])

  const goToSeach = useCallback(() => {
    history.push(HOME)
  }, [])

  return (
    <>
      <div className={styles.containerNavbar}>
        <div className={styles.buttonSearch}>
          {/* This is button its for go to search protectionist with google maps */}
          <ButtonIcon onclick={goToSeach} icon={<MdSearch size={25} />} />
          <div className={styles.logo}>Pets love</div>
        </div>
        {rootStore.authStore.isLogin ? (
          <>
            {/* When user is login show menu user */}
            <ToggleMenuUser
              handleMenu={handleMenu}
              toggle={toggleNavegationUser}
              handleToggle={setToggleNavegationUser}
            />
            {/* This container id Image user login and change language */}
            <div className={styles.containerProfile}>
              <div className={styles.containerLanguage}>
                <ChangeLanguage />
              </div>
              <div className={styles.contectImageUser}>
                <ImageUserLog
                  handleToggleMenu={handleToggleMenu}
                  isUserLogin={rootStore.authStore.isLogin}
                />
                {authStore.isLoading ? (
                  <Loading loadingRing />
                ) : (
                  <MenuProfile
                    userId={authStore.user._id}
                    handleToggleMenu={handleToggleMenu}
                    viewMenuProfile={viewMenuProfile}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          // if user is logout view buttons Login and Sing In
          <div className={styles.containerButtonslog}>
            <ButtonLink onclick={goToLogin} text={t('login')} />
            <ButtonLink onclick={goToRegister} text={t('singIn')} />
            <div className={styles.containerLanguage}>
              <ChangeLanguage />
            </div>
          </div>
        )}
      </div>
      {children}
      <Footer />
    </>
  )
}

Navbar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default observer(Navbar)
