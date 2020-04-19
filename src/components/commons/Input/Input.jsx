import React from 'react'
import PropTypes from 'prop-types'
import styles from './input.scss'
import ViewValue from '../ViewValue'

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
  disabled,
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
            defaultValue={value}
            disabled={disabled}
          />
          {isErrorEmail && (
            <div className={styles.errorMessage}>Error!, verify your email please</div>
          )}
          {isError && <div className={styles.errorMessage}>Is required, please complete</div>}
        </>
      ) : (
        <ViewValue placeholder={placeholder} value={value} />
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
