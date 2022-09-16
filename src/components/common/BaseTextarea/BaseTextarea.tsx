import { FC, useEffect } from 'react';
import c from 'classnames';
import BaseLabel from '../BaseLabel';
import BaseErrorMessage from '../BaseErrorMessage';
import styles from './BaseTextarea.module.scss';

interface Props {
  value?: any;
  title?: string;
  inputRef?: any;
  label?: string;
  inputName: string;
  marginTop?: number;
  maxLength?: number;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  marginBottom?: number;
  onPaste?: (e: any) => void;
  handleChange?: (e: any) => void;
  onBlur?: (value: string) => void;
  errorMessage?: string | undefined;
  onKeyPress?: (value: string) => void;
}

const BaseTextarea: FC<Props> = ({
  inputName,
  title = '',
  value = '',
  label = '',
  handleChange,
  onBlur = null,
  marginTop = 0,
  inputRef = null,
  maxLength = 1500,
  required = false,
  disabled = false,
  marginBottom = 0,
  placeholder = '',
  errorMessage = '',
  onKeyPress = null,
  onPaste = () => {},
}) => {
  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const hasError = () => {
    return errorMessage !== '';
  };

  return (
    <div
      className={styles.containerInput}
      data-testid={`baseInput-${inputName}`}
      style={{ marginTop, marginBottom }}
    >
      {label && <BaseLabel bold text={label} />}
      <textarea
        rows={5}
        cols={100}
        title={title}
        ref={inputRef}
        name={inputName}
        onPaste={onPaste}
        required={required}
        disabled={disabled}
        defaultValue={value}
        maxLength={maxLength}
        onBlur={() => onBlur}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyPress={() => onKeyPress}
        className={c(styles.textarea, styles.input, hasError() && styles.isError)}
      />
      {errorMessage && <BaseErrorMessage text={errorMessage} />}
    </div>
  );
};

export default BaseTextarea;
