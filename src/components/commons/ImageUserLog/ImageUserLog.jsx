import React, { useContext, useState, useCallback } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { AWS_STORAGE, USER_BUCKET } from 'services/config'
import UserContext from 'Context/UserContext'
import noImage from './noimg.png'
import styles from './imageUserLog.scss'
import Loading from '../Loading/index'

const ImageUserLog = ({ handleToggleMenu, isUserLogin, isProfile, imagePreview }) => {
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const { image } = authStore.user

  if (rootStore.authStore.isLoading) {
    return <Loading loadingRing />
  }

  return (
    <div onMouseUp={handleToggleMenu}>
      {isUserLogin && (
        <>
          {imagePreview.length > 0 ? (
            <img
              alt="user"
              onError={onError}
              className={c(isProfile ? styles.imageProfile : styles.userImage)}
              src={imagePreview.length > 0 ? imagePreview[0].preview : noImage}
            />
          ) : (
            <img
              alt="user"
              onError={onError}
              className={c(isProfile ? styles.imageProfile : styles.userImage)}
              src={
                image && isImageNotFound
                  ? `${AWS_STORAGE}/${USER_BUCKET}/${image.filenames}`
                  : noImage
              }
            />
          )}
        </>
      )}
    </div>
  )
}

ImageUserLog.propTypes = {
  isProfile: PropTypes.bool,
  isUserLogin: PropTypes.bool,
  imagePreview: PropTypes.arrayOf(PropTypes.string),
}

ImageUserLog.defaultProps = {
  isProfile: false,
  imagePreview: [],
  isUserLogin: false,
}

export default observer(ImageUserLog)
