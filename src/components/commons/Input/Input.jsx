import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import c from 'classnames'
import Label from 'components/commons/Label'
import InputStore from 'stores/InputStore'
import ViewValue from 'components/commons/ViewValue'
import styles from './input.scss'

const Input = ({
  name,
  type,
  icon,
  title,
  value,
  label,
  onBlur,
  isEdit,
  required,
  multiple,
  disabled,
  onKeyPress,
  inputStore,
  placeholder,
  isErrorEmail,
  handleChange,
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
      {label && isEdit && <Label text={label} />}
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
            onKeyPress={onKeyPress}
            onChange={handleChange}
            placeholder={placeholder}
            type={type === 'password' ? viewPassword : type}
            className={c(
              styles.input,
              icon && styles.icon,
              inputStore && inputStore.error ? styles.isError : ''
            )}
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
          {icon && <div className={c(styles.containerIcon)}>{icon}</div>}
        </div>
      ) : (
        <ViewValue placeholder={placeholder} value={value} />
      )}
    </>
  )
}

Input.propTypes = {
  icon: PropTypes.node,
  type: PropTypes.string,
  isEdit: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.string,
  multiple: PropTypes.bool,
  onKeyPress: PropTypes.func,
  isErrorEmail: PropTypes.bool,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  inputStore: PropTypes.instanceOf(InputStore),
}

Input.defaultProps = {
  icon: '',
  value: '',
  label: '',
  type: 'text',
  onBlur: null,
  isEdit: false,
  multiple: false,
  inputStore: null,
  onKeyPress: null,
  handleChange: null,
  isErrorEmail: false,
}

export default observer(Input)
