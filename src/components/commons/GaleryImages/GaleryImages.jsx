import React from 'react'
import PropTypes from 'prop-types'
import { MdPets } from 'react-icons/md'
import { SERVER } from 'services/config'
import noImage from './noImage.svg'
import styles from './galeryImages.scss'
import Loading from '../Loading/Loading'

const GaleryImages = ({ arrayImages, isLoading }) => {
  return (
    <div className={styles.containerGalery}>
      {isLoading ? (
        <Loading icon={<MdPets size={40} />} />
      ) : (
        <div className={styles.galery}>
          {arrayImages.map(image => (
            <div key={image} className={styles.colGalery}>
              <img
                className={styles.imageGalery}
                src={image ? `${SERVER}/${image}` : noImage}
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
