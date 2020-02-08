import React from 'react'
import PropTypes from 'prop-types'
import styles from './card.scss'

const Card = ({ history, image, namePet, altImage }) => {
  //Format code in store this is not responsability card component
  const verifyText = () => {
    let text
    if (history) {
      if (history.length > 110) {
        return (text = `${history.substring(0, 110)}...`)
      } else {
        return (text = history)
      }
    }
    return (history = 'They did not add history')
  }

  return (
    <div className={styles.containerCard}>
      <img className={styles.imgCard} src={image} alt={altImage} />
      <div className={styles.title}>{namePet}</div>
      <div className={styles.textHistory}>{verifyText()}</div>
    </div>
  )
}

Card.propTypes = {
  history: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  namePet: PropTypes.string.isRequired,
  altImage: PropTypes.string.isRequired,
}

export default Card
