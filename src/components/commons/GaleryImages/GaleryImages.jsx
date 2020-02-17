import React from 'react'
import PropTypes from 'prop-types'
import { MdPets } from 'react-icons/md'
import API_URL from 'config/config'
import noImage from './noImage.svg'
import styles from './galeryImages.scss'
import Loading from '../Loading/Loading'

const GaleryImages = ({ arrayImages, isLoading }) => (
  <div className={styles.containerGalery}>
    {isLoading ? (
      <Loading icon={<MdPets size={40} />} />
    ) : (
      <div className={styles.galery}>
        {arrayImages.map(image => (
          <div className={styles.colGalery}>
            <img
              className={styles.imageGalery}
              src={image ? `${API_URL}${image}` : noImage}
              alt="pets-photos"
            />
          </div>
        ))}
      </div>
    )}
  </div>
)

GaleryImages.propTypes = {
  isLoading: PropTypes.bool,
  arrayImages: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

GaleryImages.defaultProps = {
  isLoading: false,
}

export default GaleryImages
