import { useState, FC, useEffect, ChangeEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import c from "classnames";
import BaseLabel from "../BaseLabel";
import BaseErrorMessage from "../BaseErrorMessage";
import styles from "./BaseInput.module.scss";

interface Props {
  value?: any;
  type?: string;
  title?: string;
  inputRef?: any;
  label?: string;
  testId?: string;
  inputName: string;
  marginTop?: number;
  maxLength?: number;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  marginBottom?: number;
  autoComplete?: string;
  onPaste?: (e: any) => void;
  onBlur?: (value: string) => void;
  errorMessage?: string | undefined;
  onKeyPress?: (value: string) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BaseInput: FC<Props> = ({
  inputName,
  title = "",
  value = "",
  label = "",
  testId = "",
  type = "text",
  onBlur = null,
  marginTop = 0,
  inputRef = null,
  maxLength = 100,
  required = false,
  multiple = false,
  disabled = false,
  marginBottom = 0,
  placeholder = "",
  errorMessage = "",
  autoComplete = "",
  onKeyPress = null,
  onPaste = () => {},
  handleChange = () => {},
}) => {
  const [viewPassword, setViewPassword] = useState<string>("password");

  const handleViewPassword = () => {
    if (viewPassword === "password") {
      setViewPassword("text");
    }
    if (viewPassword === "text") {
      setViewPassword("password");
    }
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const hasError = () => {
    return errorMessage !== "";
  };

  return (
    <div
      className={styles.containerInput}
      data-testid={`baseInput-${testId}-${inputName}-container`}
      style={{ marginTop, marginBottom }}
    >
      {label && <BaseLabel bold marginBottom={2} text={label} />}
      <input
        value={value}
        title={title}
        ref={inputRef}
        name={inputName}
        onPaste={onPaste}
        multiple={multiple}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        onBlur={() => onBlur}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onKeyPress={() => onKeyPress}
        type={type === "password" ? viewPassword : type}
        data-testid={`baseInput-${testId}-${inputName}-input`}
        className={c(styles.input, hasError() && styles.isError)}
      />
      {type === "password" && (
        <div
          onClick={handleViewPassword}
          className={styles.viewPassword}
          data-testid="show-icon-password"
        >
          {viewPassword === "text" ? (
            <AiOutlineEye size={25} />
          ) : (
            <AiOutlineEyeInvisible size={25} />
          )}
        </div>
      )}
      {errorMessage && <BaseErrorMessage text={errorMessage} />}
    </div>
  );
};

export default BaseInput;
