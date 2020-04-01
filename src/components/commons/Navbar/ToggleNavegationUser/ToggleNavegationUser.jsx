import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import ButtonIcon from 'components/commons/ButtonIcon'
import UserContext from 'Context/UserContext'
import { MdClose } from 'react-icons/md'
import styles from './toggleNavegationUser.scss'

const ToggleNavegationUser = ({ handleToggleViewMenuUser, toggleViewMenuUser, routesUser }) => {
  const rootStore = useContext(UserContext)

  return (
    <div className={c(toggleViewMenuUser ? styles.open : styles.showMenu)}>
      <ButtonIcon onclick={handleToggleViewMenuUser} icon={<MdClose size={25} />} />
      <div className={styles.titleNavbar}>
        <div>{rootStore.authStore.user.name}</div>
      </div>
      {routesUser.map(route => (
        <div className={styles.containerLinks}>
          <div className={styles.icon}>{route.icon}</div>
          <div className={styles.text}>{route.text}</div>
        </div>
      ))}
    </div>
  )
}

ToggleNavegationUser.propTypes = {
  routesUser: PropTypes.oneOfType([PropTypes.array]).isRequired,
}

export default ToggleNavegationUser
