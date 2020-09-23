import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { AWS_STORAGE } from 'services/config'
import noImage from '../commons/CardPets/noImage.svg'
import styles from './imageProfilePet.scss'

const ImageProfilePet = ({ image }) => {
  const [isImageNotFound, setIsImageNotFound] = useState(true)

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  return (
    <div>
      <img
        alt="photos-pet"
        onError={onError}
        className={styles.imagePet}
        src={image ? `${AWS_STORAGE}/${image[0]}` : noImage}
      />
    </div>
  )
}

ImageProfilePet.propTypes = {
  image: PropTypes.oneOfType([PropTypes.array]),
}

ImageProfilePet.defaultProps = {
  image: [],
}

export default observer(ImageProfilePet)
