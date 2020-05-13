import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import ViewValue from 'components/commons/ViewValue'
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
  disabled,
  name,
  title,
  onBlur,
}) => {
  const [viewPassword, setViewPassword] = useState('password')

  const handleViewPassword = () => {
    if (viewPassword === 'password') {
      setViewPassword('text')
    }
    if (viewPassword === 'text') {
      setViewPassword('password')
    }
  }

  return (
    <>
      {isEdit ? (
        <div className={styles.containerInput}>
          <input
            title={title}
            onBlur={onBlur}
            name={name}
            multiple={multiple}
            required={required}
            className={styles.input}
            type={type === 'password' ? viewPassword : type}
            placeholder={placeholder}
            onChange={handleChange}
            defaultValue={value}
            disabled={disabled}
          />
          {isErrorEmail && (
            <div className={styles.errorMessage}>Error!, verify your email please</div>
          )}
          {type === 'password' && (
            <div onClick={handleViewPassword} className={styles.viewPassword}>
              {viewPassword === 'text' ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </div>
          )}
          {isError && <div className={styles.errorMessage}>Is required, please complete</div>}
        </div>
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
  onBlur: PropTypes.string,
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
  onBlur: null,
}

export default Input
