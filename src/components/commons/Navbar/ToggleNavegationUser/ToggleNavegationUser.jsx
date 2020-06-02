import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MdClose } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import ButtonIcon from 'components/commons/ButtonIcon'
import UserContext from 'Context/UserContext'
import ImageUserLog from '../../ImageUserLog'
import styles from './toggleNavegationUser.scss'

const ToggleNavegationUser = ({ handleToggleViewMenuUser, toggleViewMenuUser, routesUser }) => {
  const { t } = useTranslation('navbar')
  const rootStore = useContext(UserContext)
  const { email, _id } = rootStore.authStore.user

  return (
    <div className={c(toggleViewMenuUser ? styles.open : styles.showMenu)}>
      <ButtonIcon onclick={handleToggleViewMenuUser} icon={<MdClose size={25} />} />
      <div className={styles.titleNavbar}>
        <ImageUserLog isUserLogin />
        <div className={styles.name}>{email}</div>
      </div>
      <div className={styles.line} />
      {routesUser.map(route => (
        <Link
          to={route.haveId ? `${route.link}/${_id}` : route.link}
          key={route.text}
          onClick={handleToggleViewMenuUser}
          className={styles.containerLinks}
        >
          <div className={styles.icon}>{route.icon}</div>
          <div className={styles.text}>{t(route.text)}</div>
        </Link>
      ))}
    </div>
  )
}

ToggleNavegationUser.propTypes = {
  routesUser: PropTypes.oneOfType([PropTypes.array]).isRequired,
}

export default ToggleNavegationUser
