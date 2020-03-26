import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { USER_PROFILE } from 'routing/routes'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import styles from './menuProfile.scss'

const MenuProfile = ({ handleToggleMenu, viewMenuProfile }) => {
  const history = useHistory()
  const { t } = useTranslation()

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    history.push('/')
    window.location.reload()
  }, [])

  return (
    <div
      onMouseLeave={handleToggleMenu}
      className={c(styles.containerMenu, viewMenuProfile && styles.viewMenu)}
    >
      <div className={styles.contentButtos}>
        <Link to={USER_PROFILE} className={styles.buttons}>
          {t('menuProfile.profile')}
        </Link>
        <Link onClick={handleLogout} className={styles.buttons}>
          {t('menuProfile.logout')}
        </Link>
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
