import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import c from 'classnames'
import InputStore from 'stores/InputStore'
import ViewValue from 'components/commons/ViewValue'
import styles from './input.scss'

const Input = ({
  inputStore,
  isEdit,
  value,
  required,
  handleChange,
  placeholder,
  type,
  isErrorEmail,
  multiple,
  disabled,
  name,
  title,
  onBlur,
}) => {
  const { t } = useTranslation('createPet')
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
            name={name}
            title={title}
            onBlur={onBlur}
            multiple={multiple}
            required={required}
            disabled={disabled}
            defaultValue={value}
            onChange={handleChange}
            placeholder={placeholder}
            type={type === 'password' ? viewPassword : type}
            className={c(styles.input, inputStore.error && styles.isError)}
          />
          {isErrorEmail && (
            <div className={styles.errorMessage}>Error!, verify your email please</div>
          )}
          {type === 'password' && (
            <div onClick={handleViewPassword} className={styles.viewPassword}>
              {viewPassword === 'text' ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </div>
          )}
          {inputStore && (
            <div className={styles.errorMessage}>{t(`${inputStore.errorMessage}`)}</div>
          )}
        </div>
      ) : (
        <ViewValue placeholder={placeholder} value={value} />
      )}
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.string,
  multiple: PropTypes.bool,
  isErrorEmail: PropTypes.bool,
  isEdit: PropTypes.bool,
  value: PropTypes.string,
  inputStore: PropTypes.instanceOf(InputStore),
}

Input.defaultProps = {
  handleChange: null,
  isEdit: false,
  value: '',
  type: 'text',
  multiple: false,
  isErrorEmail: false,
  onBlur: null,
  inputStore: false,
}

export default observer(Input)
