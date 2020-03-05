import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './errorMessage.scss'

const ErrorMessage = ({ text, typeMessage }) => {
  return (
    <div
      className={c(
        styles.containerError,
        typeMessage === 'warning' && styles.warning,
        typeMessage === 'error' && styles.error
      )}
    >
      <div className={styles.text}>{text}</div>
    </div>
  )
}

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
  typeMessage: PropTypes.string.isRequired,
}

export default ErrorMessage
