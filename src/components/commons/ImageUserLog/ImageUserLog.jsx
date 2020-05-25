import React, { useCallback, useContext, useState } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { SERVER } from 'services/config'
import UserContext from 'Context/UserContext'
import noImage from './noimg.png'
import styles from './imageUserLog.scss'

const ImageUserLog = ({ handleToggleMenu, isUserLogin, isProfile, imagePreview }) => {
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  return (
    <div onMouseUp={handleToggleMenu}>
      {isUserLogin && (
        <>
          {imagePreview ? (
            <img
              onError={onError}
              className={c(isProfile ? styles.imageProfile : styles.userImage)}
              src={imagePreview[0].preview}
              alt="user"
            />
          ) : (
            <img
              onError={onError}
              className={c(isProfile ? styles.imageProfile : styles.userImage)}
              src={
                authStore.user.image && isImageNotFound
                  ? `${SERVER}/${authStore.user.image}`
                  : noImage
              }
              alt="user"
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
  imagePreview: PropTypes.string,
}

ImageUserLog.defaultProps = {
  isUserLogin: false,
  isProfile: false,
  imagePreview: null,
}

export default observer(ImageUserLog)
