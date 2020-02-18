import React from 'react'
import PropTypes from 'prop-types'
import styles from './input.scss'

const Input = ({ handleChange, placeholder, type }) => {
  return (
    <input className={styles.input} type={type} placeholder={placeholder} onChange={handleChange} />
  )
}

Input.propTypes = {
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

Input.defaultProps = {
  type: 'text',
}

export default Input
