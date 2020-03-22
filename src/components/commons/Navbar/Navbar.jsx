import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { useTranslation } from 'react-i18next'
import { FiFilter } from 'react-icons/fi'
import { useHistory } from 'react-router'
import { MdClose } from 'react-icons/md'
import ChangeLanguage from 'components/commons/ChangeLanguage'
import ButtonLink from 'components/commons/ButtonLink'
import FilterNavbar from 'components/FilterNavbar'
import styles from './navbar.scss'
import ImageUserLog from '../ImageUserLog'
import ButtonIcon from '../ButtonIcon'

const Navbar = ({ searchPetsStore, optionsSelectsStore, isUserLogin }) => {
  const [toggle, setToggle] = useState(false)
  const { t } = useTranslation()
  const history = useHistory()

  const goToLogin = useCallback(() => history.push('/login'))
  const goToRegister = useCallback(() => history.push('/register'))

  const handleToggle = useCallback(() => {
    setToggle(!toggle)
  })

  return (
    <>
      <div className={styles.containerNavbar}>
        <ButtonIcon onclick={handleToggle} icon={<FiFilter size={25} />} />
        {isUserLogin ? (
          <div className={styles.contectImageUser}>
            <ChangeLanguage />
            <ImageUserLog isUserLogin={isUserLogin} />
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
  isUserLogin: PropTypes.bool,
}

Navbar.defaultProps = {
  isUserLogin: false,
}

export default Navbar
