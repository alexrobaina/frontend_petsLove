import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import API_URL from 'config/config'
import noImage from '../commons/CardPets/noImage.svg'
import styles from './imageProfilePet.scss'

const ImageProfilePet = ({ petIdStore }) => {
  return (
    <div>
      <img
        className={styles.imagePet}
        src={petIdStore.images !== [] ? `${API_URL}${petIdStore.images[0]}` : noImage}
        alt="photos-pet"
      />
    </div>
  )
}

ImageProfilePet.propTypes = {
  petIdStore: PropTypes.node.isRequired,
}

export default observer(ImageProfilePet)
