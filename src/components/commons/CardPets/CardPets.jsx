import React from 'react'
import PropTypes from 'prop-types'
import Utils from 'utils'
import URL_LOCAL from 'config/config'
import noImage from './noImage.svg'
import LayoutCards from '../LayoutCards'
import styles from './cardPets.scss'

const CardPets = ({ history, image, namePet }) => {
  const utils = new Utils()

  return (
    <LayoutCards isButton>
      <div className={styles.containerCard}>
        <img
          className={styles.imgCard}
          src={image ? `${URL_LOCAL}${image}` : noImage}
          alt="photos-pets"
        />
        <div className={styles.title}>{namePet}</div>
        <div className={styles.textHistory}>
          {history ? utils.shortenText(history, 110) : 'They did not add history'}
        </div>
      </div>
    </LayoutCards>
  )
}

CardPets.propTypes = {
  history: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  namePet: PropTypes.string.isRequired,
}

export default CardPets
