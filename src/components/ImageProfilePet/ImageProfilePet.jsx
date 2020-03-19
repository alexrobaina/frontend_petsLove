import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SERVER } from 'services/config'
import noImage from '../commons/CardPets/noImage.svg'
import styles from './imageProfilePet.scss'

const ImageProfilePet = ({ petIdStore }) => {
  return (
    <div>
      <img
        className={styles.imagePet}
        src={petIdStore.images !== [] ? `${SERVER}/${petIdStore.images[0]}` : noImage}
        alt="photos-pet"
      />
    </div>
  )
}

ImageProfilePet.propTypes = {
  petIdStore: PropTypes.node.isRequired,
}

export default observer(ImageProfilePet)
