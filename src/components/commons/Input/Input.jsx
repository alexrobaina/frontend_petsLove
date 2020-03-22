import React from 'react'
import PropTypes from 'prop-types'
import styles from './input.scss'

const Input = ({ multiple, required, handleChange, placeholder, type, isError, isErrorEmail }) => {
  return (
    <>
      <input
        required={required}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        multiple={multiple}
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
  multiple: PropTypes.string,
  isError: PropTypes.bool,
  isErrorEmail: PropTypes.bool,
}

Input.defaultProps = {
  type: 'text',
  multiple: false,
  isError: false,
  isErrorEmail: false,
}

export default Input
