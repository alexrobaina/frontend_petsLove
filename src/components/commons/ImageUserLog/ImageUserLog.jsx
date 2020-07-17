import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { AWS_STORAGE } from 'services/config'
import UserContext from 'Context/UserContext'
import noImage from './noimg.png'
import styles from './imageUserLog.scss'

const ImageUserLog = ({ handleToggleMenu, isUserLogin, isProfile, imagePreview }) => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const { image } = authStore.user

  return (
    <div onMouseUp={handleToggleMenu}>
      {isUserLogin && (
        <>
          {imagePreview.length > 0 ? (
            <img
              alt="user"
              className={c(isProfile ? styles.imageProfile : styles.userImage)}
              src={imagePreview.length > 0 ? imagePreview[0].preview : noImage}
            />
          ) : (
            <img
              alt="user"
              className={c(isProfile ? styles.imageProfile : styles.userImage)}
              src={image ? `${AWS_STORAGE}/${image.filenames}` : noImage}
            />
          )}
        </>
      )}
    </div>
  )
}

ImageUserLog.propTypes = {
  isUserLogin: PropTypes.bool,
  isProfile: PropTypes.bool,
  imagePreview: PropTypes.arrayOf(PropTypes.string),
}

ImageUserLog.defaultProps = {
  isUserLogin: false,
  isProfile: false,
  imagePreview: [],
}

export default observer(ImageUserLog)
