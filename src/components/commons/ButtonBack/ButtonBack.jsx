import React from 'react'
import PropTypes from 'prop-types'
import { MdArrowBack } from 'react-icons/md'
import styles from './buttonBack.scss'

const ButtonBack = ({ handleClick, text }) => {
  return (
    <div onClick={handleClick} className={styles.containerButton}>
      <div className={styles.back}>
        <MdArrowBack size={25} />
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  )
}

ButtonBack.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default ButtonBack
