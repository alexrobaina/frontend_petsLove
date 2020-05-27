import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { MdPets } from 'react-icons/md'
import { SERVER } from 'services/config'
import Loading from 'components/commons/Loading'
import noImage from './noImage.svg'
import styles from './galeryImages.scss'

const GaleryImages = ({ arrayImages, isLoading }) => {
  const [isImageNotFound, setIsImageNotFound] = useState(true)

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  return (
    <div className={styles.containerGalery}>
      {isLoading ? (
        <Loading icon={<MdPets size={40} />} />
      ) : (
        <div className={styles.galery}>
          {arrayImages.map(image => (
            <div key={image} className={styles.colGalery}>
              <img
                onError={onError}
                className={styles.imageGalery}
                src={image && isImageNotFound ? `${SERVER}/${image}` : noImage}
                alt="pets-photos"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

GaleryImages.propTypes = {
  isLoading: PropTypes.bool,
  arrayImages: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

GaleryImages.defaultProps = {
  isLoading: false,
}

export default GaleryImages
