import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { AWS_STORAGE } from 'services/config'
import noImage from '../commons/CardPets/noImage.svg'
import styles from './imageProfilePet.scss'

const ImageProfilePet = ({ image }) => {
  return (
    <div>
      <img
        alt="photos-pet"
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
