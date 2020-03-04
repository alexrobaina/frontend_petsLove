import React from 'react'
import PropTypes from 'prop-types'
import Utils from 'utils'
import URL_LOCAL from 'config/config'
import i18n from 'utils/i18n'
import { Translation } from 'react-i18next'
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
        <Translation i18n={i18n}>
          {(t, { i18n }) => (
            <div className={styles.textHistory}>
              {history ? t(utils.shortenText(history, 110)) : t('They did not add history')}
            </div>
          )}
        </Translation>
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
