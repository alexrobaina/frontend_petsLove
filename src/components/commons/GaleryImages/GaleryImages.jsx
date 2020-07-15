import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { MdPets } from 'react-icons/md'
import { AWS_STORAGE, SERVER } from "services/config";
import PetIdStore from 'stores/PetIdStore'
import Loading from 'components/commons/Loading'
import noImage from './noImage.svg'
import styles from './galeryImages.scss'

const GaleryImages = ({ store, isLoading }) => {
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
          {store.filenames.map(image => {
            return (
              <div key={image} className={styles.colGalery}>
                <img
                  onError={onError}
                  className={styles.imageGalery}
                  src={image && isImageNotFound ? `${AWS_STORAGE}/${image}` : noImage}
                  alt="pets-photos"
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

GaleryImages.propTypes = {
  isLoading: PropTypes.bool,
  store: PropTypes.instanceOf(PetIdStore).isRequired,
}

GaleryImages.defaultProps = {
  isLoading: false,
}

export default  observer(GaleryImages)
