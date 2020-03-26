import React from 'react'
import PropTypes from 'prop-types'
import styles from './input.scss'

const Input = ({ required, handleChange, placeholder, type, isError, isErrorEmail }) => {
  return (
    <>
      <input
        required={required}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {isErrorEmail && <div className={styles.errorMessage}>Error!, verify your email please</div>}
      {isError && <div className={styles.errorMessage}>Is required, please complete</div>}
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  isErrorEmail: PropTypes.bool,
}

Input.defaultProps = {
  type: 'text',
  isError: false,
  isErrorEmail: false,
}

export default Input
