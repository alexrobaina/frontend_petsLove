import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import noImg from './noimg.png'
import styles from './imageUserLog.scss'

const ImageUserLog = ({ handleToggleMenu, isUserLogin, imgUser, isProfile }) => {
  return (
    <div onMouseUp={handleToggleMenu}>
      {isUserLogin && (
        <img
          className={c(isProfile ? styles.imageProfile : styles.userImage)}
          src={imgUser}
          alt="user"
        />
      )}
    </div>
  )
}

ImageUserLog.propTypes = {
  isUserLogin: PropTypes.bool,
  isProfile: PropTypes.bool,
  imgUser: PropTypes.string,
}

ImageUserLog.defaultProps = {
  isUserLogin: false,
  isProfile: false,
  imgUser: noImg,
}

export default ImageUserLog
