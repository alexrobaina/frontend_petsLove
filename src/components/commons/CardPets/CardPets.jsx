import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Utils from 'utils'
import { useTranslation } from 'react-i18next'
import { AWS_STORAGE } from 'services/config'
import LayoutCards from 'components/commons/LayoutCards'
import Chips from 'components/commons/Chips'
import noImage from './noImage.svg'
import styles from './cardPets.scss'

const CardPets = ({ history, image, namePet, isAdopted }) => {
  const { t } = useTranslation('petsCard')
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const utils = new Utils()

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  return (
    <div className={styles.rowCard}>
      <LayoutCards isButton>
        <div className={styles.containerCard}>
          <img
            onError={onError}
            className={styles.imgCard}
            src={image && isImageNotFound ? `${AWS_STORAGE}/${image}` : noImage}
            alt="photos-pets"
          />
          {isAdopted && <Chips text={t('adopted')} isAdopted={isAdopted} />}
          <div className={styles.title}>{namePet}</div>
          <div className={styles.textHistory}>
            {history ? utils.shortenText(history, 110) : t('notFoundHistory')}
          </div>
        </div>
      </LayoutCards>
    </div>
  )
}

CardPets.propTypes = {
  isAdopted: PropTypes.bool,
  history: PropTypes.string.isRequired,
  image: PropTypes.oneOfType(PropTypes.string, PropTypes.array),
  namePet: PropTypes.string.isRequired,
}

CardPets.defaultProps = {
  image: '',
  isAdopted: false,
}

export default CardPets
