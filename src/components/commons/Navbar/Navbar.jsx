import React, { useState, useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { useTranslation } from 'react-i18next'
import { FiFilter } from 'react-icons/fi'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import { LOGIN, REGISTER } from 'routing/routes'
import ChangeLanguage from 'components/commons/ChangeLanguage'
import ErrorMessage from 'components/commons/ErrorMessage'
import UserContext from 'Context/UserContext'
import ButtonLink from 'components/commons/ButtonLink'
import ListPets from 'components/ListPets'
import MenuProfile from 'components/commons/MenuProfile'
import ImageUserLog from 'components/commons/ImageUserLog'
import ButtonIcon from 'components/commons/ButtonIcon'
import LayoutContainer from 'components/commons/LayoutContainer'
import ToggleFilter from './ToggleFilter/ToggleFilter'
import ToggleMenuUser from './ToggleMenuUser/ToggleMenuUser'
import styles from './navbar.scss'

const Navbar = ({ children }) => {
  const rootStore = useContext(UserContext)
  const { searchPetsStore, optionsSelectsStore, authStore } = rootStore

  const [toggleNavegationUser, setToggleNavegationUser] = useState(false)
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

  const deleteFilter = useCallback((selectedValue, typeFilter) => {
    searchPetsStore.deleteFilter(selectedValue, typeFilter)
  })

  useEffect(() => {
    if (authStore.user) {
      authStore.loadUser(authStore.user._id)
    }

    if (!viewMenuProfile) {
      setTimeout(() => {
        setViewMenuProfile(true)
      }, 3500)
    }
  }, [viewMenuProfile])

  const handleMenu = useCallback(link => {
    history.push(link)
  }, [])

  return (
    <>
      <div className={styles.containerNavbar}>
        <div className={styles.containerFilter}>
          {/* this is button that open filters */}
          <ButtonIcon onclick={handleToggle} icon={<FiFilter size={25} />} />
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
              <div>
                <ChangeLanguage />
              </div>
              <div className={styles.contectImageUser}>
                <MenuProfile
                  userId={authStore.user._id}
                  handleToggleMenu={handleToggleMenu}
                  viewMenuProfile={viewMenuProfile}
                />
                <ImageUserLog
                  handleToggleMenu={handleToggleMenu}
                  isUserLogin={rootStore.authStore.isLogin}
                />
              </div>
            </div>
          </>
        ) : (
          // if user is logout view buttons Login and Sing In
          <div className={styles.containerButtonslog}>
            <ButtonLink onclick={goToLogin} text={t('navbar.login')} />
            <ButtonLink onclick={goToRegister} text={t('navbar.singIn')} />
            <ChangeLanguage />
          </div>
        )}
      </div>
      {/* this components view all filtes for search pets */}
      <ToggleFilter
        searchPetsStore={searchPetsStore}
        optionsSelectsStore={optionsSelectsStore}
        handleToggle={handleToggle}
        toggle={toggle}
      />
      {!searchPetsStore.pets ? (
        <>{!searchPetsStore.isError && <>{children}</>}</>
      ) : (
        <ListPets
          handleDelete={deleteFilter}
          filters={searchPetsStore.filters}
          pets={searchPetsStore.pets}
          isLoading={searchPetsStore.isLoading}
        />
      )}
      <div className={c(toggle && styles.showShadowBack)} onClick={() => setToggle(!toggle)} />
      {searchPetsStore.isError && (
        <LayoutContainer>
          <ErrorMessage text={t('common.errorMessage')} typeMessage="warning" />
        </LayoutContainer>
      )}
    </>
  )
}

Navbar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default observer(Navbar)
