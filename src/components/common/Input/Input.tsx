import { useState, FC, ReactChild } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import c from 'classnames';
// import InputStore from 'stores/InputStore';
import styles from './input.module.scss';

interface Props {
  name: string;
  type: string;
  icon: ReactChild;
  title: string;
  value: any;
  label: string;
  onBlur: Function;
  required: boolean;
  multiple: boolean;
  disabled: boolean;
  onKeyPress: Function;
  inputStore: object;
  placeholder: string;
  handleChange: Function;
}

const Input: FC<Props> = ({
  name = '',
  type = 'text',
  icon = null,
  title = '',
  value = '',
  label = '',
  onBlur = null,
  required = false,
  multiple = false,
  disabled = false,
  placeholder = '',
  inputStore = null,
  onKeyPress = null,
  handleChange = null,
}) => {
  const { t } = useTranslation('createPet');
  const [viewPassword, setViewPassword] = useState('password');

  const handleViewPassword = () => {
    if (viewPassword === 'password') {
      setViewPassword('text');
    }
    if (viewPassword === 'text') {
      setViewPassword('password');
    }
  };

  return (
    <>
      <div className={styles.containerInput}>
        <label>{label}</label>
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
            // inputStore && inputStore.error ? styles.isError : '',
          )}
        />
        {type === 'password' && (
          <div onClick={handleViewPassword} className={styles.viewPassword}>
            {viewPassword === 'text' ? (
              <FaRegEyeSlash size={20} />
            ) : (
              <FaRegEye size={20} />
            )}
          </div>
        )}
        {inputStore && <div className={styles.errorMessage}>{errorMessage}</div>}
        {icon && <div className={c(styles.containerIcon)}>{icon}</div>}
      </div>
    </>
  );
};

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
};

export default Input;
