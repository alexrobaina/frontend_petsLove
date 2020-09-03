import React, { useContext, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { MdClose } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import ButtonIcon from 'components/commons/ButtonIcon'
import UserContext from 'Context/UserContext'
import { AWS_STORAGE } from 'services/config'
import noImage from './noimg.png'
import styles from './toggleNavegationUser.scss'

const ToggleNavegationUser = ({ handleToggleViewMenuUser, toggleViewMenuUser, routesUser }) => {
  const [isImageNotFound, setIsImageNotFound] = useState(true)

  const { t } = useTranslation('navbar')
  const rootStore = useContext(UserContext)

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const { email, _id, name, image } = rootStore.authStore.user

  return (
    <div
      onClick={handleToggleViewMenuUser}
      className={c(toggleViewMenuUser ? styles.open : styles.showMenu)}
    >
      <ButtonIcon onclick={handleToggleViewMenuUser} icon={<MdClose size={25} />} />
      <div className={styles.titleNavbar}>
        <img
          alt="user"
          onError={onError}
          className={styles.imageProfile}
          src={image && isImageNotFound ? `${AWS_STORAGE}/${image.filenames}` : noImage}
        />
        <div className={styles.name}>{name}</div>
        <div className={styles.email}>{email}</div>
      </div>
      <div className={styles.line} />
      {routesUser.map(route => (
        <Link
          key={route.text}
          onClick={handleToggleViewMenuUser}
          className={styles.containerLinks}
          to={route.haveId ? `${route.link}/${_id}` : route.link}
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

export default observer(ToggleNavegationUser)
