import React from 'react'
import PropTypes from 'prop-types'
import styles from './input.scss'

const Input = ({ multiple, handleChange, placeholder, type }) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      multiple={multiple}
    />
  )
}

Input.propTypes = {
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  multiple: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  multiple: false,
}

export default Input
