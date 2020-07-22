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
          alt="photos-user"
          className={styles.imageCard}
          src={image ? `${AWS_STORAGE}/${image}` : noImage}
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
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string,
  textButton: PropTypes.string,
}

CardGoogle.defaultProps = {
  id: '',
  name: '',
  image: '',
  email: '',
  textButton: '',
}

export default observer(CardGoogle)
