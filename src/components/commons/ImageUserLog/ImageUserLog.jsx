import React from 'react'
import PropTypes from 'prop-types'
import user from './anton-darius-thesollers-LH-NYOZmENI-unsplash.jpg'
import noImg from './noimg.png'
import styles from './imageUserLog.scss'

const ImageUserLog = ({ handleToggleMenu, isUserLogin, imgUser }) => {
  return (
    <div onMouseUp={handleToggleMenu}>
      {isUserLogin && <img className={styles.userImage} src={user ? imgUser : noImg} alt="user" />}
    </div>
  )
}

ImageUserLog.propTypes = {
  isUserLogin: PropTypes.bool,
  imgUser: PropTypes.string,
}

ImageUserLog.defaultProps = {
  isUserLogin: false,
  imgUser: 'https://areajugones.sport.es/wp-content/uploads/2018/08/one-punch-man.png',
}

export default ImageUserLog
