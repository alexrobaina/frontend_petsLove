import React from 'react'
import PropTypes from 'prop-types'
import styles from './input.scss'

const Input = ({
  isEdit,
  value,
  required,
  handleChange,
  placeholder,
  type,
  isError,
  isErrorEmail,
  multiple,
}) => {
  return (
    <>
      {isEdit ? (
        <>
          <input
            multiple={multiple}
            required={required}
            className={styles.input}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
          />
          {isErrorEmail && (
            <div className={styles.errorMessage}>Error!, verify your email please</div>
          )}
          {isError && <div className={styles.errorMessage}>Is required, please complete</div>}
        </>
      ) : (
        <>
          <label className={styles.label}>{placeholder}</label>
          <div className={styles.value}>{value}</div>
        </>
      )}
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  isError: PropTypes.bool,
  isErrorEmail: PropTypes.bool,
  isEdit: PropTypes.bool,
  value: PropTypes.string,
}

Input.defaultProps = {
  isEdit: false,
  value: '',
  type: 'text',
  isError: false,
  multiple: false,
  isErrorEmail: false,
}

export default Input
