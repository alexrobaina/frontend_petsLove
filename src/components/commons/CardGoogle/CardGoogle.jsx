import React from 'react'
import PropTypes from 'prop-types'
import { SERVER, HOST } from 'services/config'
import noImage from './noimg.png'
import styles from './cardGoogle.scss'

const CardGoogle = ({ image, name, email, textButton, id }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerImage}>
        <img
          className={styles.imageCard}
          src={image ? `${SERVER}/${image}` : noImage}
          alt="photos-user"
        />
      </div>
      <div className={styles.containerCard}>
        <div className={styles.title}>{name}</div>
        <div className={styles.text}>{email}</div>
        <div className={styles.button}>
          <a className={styles.buttonLink} href={`${HOST}/profile-user/${id}`}>
            {textButton}
          </a>
        </div>
      </div>
    </div>
  )
}

CardGoogle.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default CardGoogle
