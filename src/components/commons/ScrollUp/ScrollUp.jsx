import React from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'
import styles from './scrollUp.scss'

const ButtonBack = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div onClick={scrollTop} className={styles.containerButton}>
      <div className={styles.up}>
        <FaArrowCircleUp size={40} />
      </div>
    </div>
  )
}

export default ButtonBack
