import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { SERVER } from 'services/config'
import UserContext from 'Context/UserContext'
import styles from './imageUserLog.scss'

const ImageUserLog = ({ handleToggleMenu, isUserLogin, isProfile }) => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  return (
    <div onMouseUp={handleToggleMenu}>
      {isUserLogin && (
        <img
          className={c(isProfile ? styles.imageProfile : styles.userImage)}
          src={`${SERVER}/${authStore.user.image}`}
          alt="user"
        />
      )}
    </div>
  )
}

ImageUserLog.propTypes = {
  isUserLogin: PropTypes.bool,
  isProfile: PropTypes.bool,
}

ImageUserLog.defaultProps = {
  isUserLogin: false,
  isProfile: false,
}

export default ImageUserLog
