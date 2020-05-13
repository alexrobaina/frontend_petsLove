import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Utils from 'utils'
import { SERVER } from 'services/config'
import LayoutCards from 'components/commons/LayoutCards'
import noImage from './noImage.svg'
import styles from './cardPets.scss'
import Chips from '../Chips'

const CardPets = ({ history, image, namePet, isAdopted }) => {
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
            src={image && isImageNotFound ? `${SERVER}/${image}` : noImage}
            alt="photos-pets"
          />
          {isAdopted && <Chips text="Adopted" isAdopted={isAdopted} />}
          <div className={styles.title}>{namePet}</div>
          <div className={styles.textHistory}>
            {history ? utils.shortenText(history, 110) : 'They did not add history'}
          </div>
        </div>
      </LayoutCards>
    </div>
  )
}

CardPets.propTypes = {
  isAdopted: PropTypes.bool,
  history: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  namePet: PropTypes.string.isRequired,
}

CardPets.defaultProps = {
  isAdopted: false,
}

export default CardPets
