import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { LOGIN } from 'routing/routes'
import UserContext from 'Context/UserContext'
import styles from './menuProfile.scss'

const MenuProfile = ({ handleToggleMenu, viewMenuProfile }) => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const history = useHistory()
  const { t } = useTranslation()
  const handleLogout = useCallback(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    history.push(LOGIN)
    window.location.reload()
  }, [])

  const goToProfile = useCallback(() => {
    history.push(`/`)
    history.push(`profile/${authStore.user._id}`)
  }, [])

  return (
    <div
      onMouseLeave={handleToggleMenu}
      className={c(styles.containerMenu, viewMenuProfile && styles.viewMenu)}
    >
      <div className={styles.contentButtos}>
        <div onClick={goToProfile} className={styles.buttons}>
          {t('menuProfile.profile')}
        </div>
        <div onClick={handleLogout} className={styles.buttons}>
          {t('menuProfile.logout')}
        </div>
      </div>
    </div>
  )
}

MenuProfile.propTypes = {
  viewMenuProfile: PropTypes.bool,
}

MenuProfile.defaultProps = {
  viewMenuProfile: false,
}

export default MenuProfile
