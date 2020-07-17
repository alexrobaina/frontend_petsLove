import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { HOST, AWS_STORAGE } from 'services/config'
import noImage from './noimg.png'
import styles from './cardGoogle.scss'

const CardGoogle = ({ image, name, email, textButton, id }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerImage}>
        <img
          className={styles.imageCard}
          src={image ? `${AWS_STORAGE}/${image}` : noImage}
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
  name: PropTypes.string,
  id: PropTypes.string,
  email: PropTypes.string,
  textButton: PropTypes.string,
  image: PropTypes.string,
}

CardGoogle.defaultProps = {
  image: '',
  email: '',
  textButton: '',
  id: '',
  name: '',
}

export default observer(CardGoogle)
