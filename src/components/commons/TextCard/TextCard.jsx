import React from 'react'
import PropTypes from 'prop-types'
import styles from './textCard.scss'
import LayoutCards from '../LayoutCards'

const TextCard = ({ title, text }) => {
  return (
    <LayoutCards>
      <div className={styles.historyPets}>
        <div className={styles.titleHistory}>{title}</div>
        <div className={styles.history}>{text}</div>
      </div>
    </LayoutCards>
  )
}

TextCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default TextCard
