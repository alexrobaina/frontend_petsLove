import React from 'react'
import PropTypes from 'prop-types'
import styles from './successMessage.scss'
import Title from '../Title/Title'

const SuccessMessage = ({ title, message }) => {
  return (
    <>
      <div className={styles.container}>
        <Title title={title} />
        <div className={styles.message}>{message}</div>
      </div>
      <div className={styles.containerGif}>
        <img
          className={styles.gif}
          src="https://media.giphy.com/media/YRtLgsajXrz1FNJ6oy/giphy.gif"
          alt="gif cats"
        />
      </div>
    </>
  )
}

SuccessMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default SuccessMessage
