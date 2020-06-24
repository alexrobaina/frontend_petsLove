import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SERVER } from 'services/config'
import noImage from '../commons/CardPets/noImage.svg'
import styles from './imageProfilePet.scss'

const ImageProfilePet = ({ images }) => {
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
        src={images && isImageNotFound ? `${SERVER}/${images[0]}` : noImage}
      />
    </div>
  )
}

ImageProfilePet.propTypes = {
  images: PropTypes.oneOfType([PropTypes.array]).isRequired,
}

export default observer(ImageProfilePet)
