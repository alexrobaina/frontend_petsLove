import React from 'react'
import PropTypes from 'prop-types'
import styles from './textInformationInput.scss'

const TextInformationInput = ({ textMessage }) => {
  return <div className={styles.message}>{textMessage}</div>
}

TextInformationInput.propTypes = {
  textMessage: PropTypes.string.isRequired,
}

export default TextInformationInput
