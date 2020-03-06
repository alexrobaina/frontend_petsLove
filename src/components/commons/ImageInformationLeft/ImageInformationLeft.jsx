import React from 'react'
import PropTypes from 'prop-types'
import styles from './imageInformationLeft.scss'

const ImageInformationLeft = ({ image }) => {
  return (
    <div className={styles.imageInformationRegister}>
      <img className={styles.imageInformation} src={image} alt="information" />
    </div>
  )
}

ImageInformationLeft.propTypes = {
  image: PropTypes.string.isRequired,
}

export default ImageInformationLeft
