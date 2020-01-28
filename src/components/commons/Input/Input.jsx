import React from 'react'
import PropTypes from 'prop-types'
import styles from './input.scss'

const Input = ({ handleChange, placeholder }) => {
  return (
    <input className={styles.input} type="text" placeholder={placeholder} onChange={handleChange} />
  )
}

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default Input
