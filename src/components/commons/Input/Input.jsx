import React from 'react'
import PropTypes from 'prop-types'
import styles from './input.scss'

const Input = ({
  isEdit,
  canEdit,
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
      {isEdit && canEdit ? (
        <>
          <input
            multiple={multiple}
            required={required}
            className={styles.input}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            defaultValue={value}
          />
          {isErrorEmail && (
            <div className={styles.errorMessage}>Error!, verify your email please</div>
          )}
          {isError && <div className={styles.errorMessage}>Is required, please complete</div>}
        </>
      ) : (
        <>
          <label className={styles.label}>{placeholder}</label>
          {value ? (
            <div className={styles.value}>{value}</div>
          ) : (
            <div className={styles.value}>-</div>
          )}
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
  canEdit: PropTypes.bool,
  value: PropTypes.string,
}

Input.defaultProps = {
  isEdit: false,
  canEdit: false,
  value: '',
  type: 'text',
  isError: false,
  multiple: false,
  isErrorEmail: false,
}

export default Input
