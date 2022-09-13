import { FC, useState, useEffect } from "react";
import Select from "react-select";
import BaseErrorMessage from "../BaseErrorMessage";
import BaseLabel from "../BaseLabel";
import styles from "./BaseSelectInput.module.scss";

type OptionType = { label: string; value: string }[];
interface ISelectInputProps {
  value: string;
  label?: string;
  inputName?: string;
  marginTop?: number;
  options: OptionType;
  setFieldValue?: any;
  isLoading?: boolean;
  placeholder: string;
  isClearable?: boolean;
  marginBottom?: number;
  errorMessage?: string;
  isSearcheable?: boolean;
}

const BaseSelectInput: FC<ISelectInputProps> = ({
  value,
  options,
  isLoading,
  label = "",
  setFieldValue,
  marginTop = 0,
  inputName = "",
  marginBottom = 0,
  placeholder = "",
  errorMessage = "",
  isClearable = false,
}) => {
  const errorFormatted = errorMessage || "";
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (errorMessage) {
      setError(errorFormatted);
    }
  }, [errorMessage, errorFormatted]);

  return (
    <div style={{ marginTop, marginBottom }}>
      {label && <BaseLabel bold text={label} />}
      <Select
        styles={styles}
        name={inputName}
        options={options}
        isLoading={isLoading}
        placeholder={placeholder}
        className={styles.select}
        isClearable={isClearable}
        value={value && options.find((option) => option.value === value)}
        components={{
          IndicatorSeparator: null,
        }}
        onChange={(option: any) => {
          if (option) {
            return setFieldValue(inputName, option.value);
          }
          setFieldValue(inputName, "");
        }}
        theme={(theme: any) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral30: "#ed6193",
            neutral20: errorMessage ? "#ce0000" : "#5e92f3",
            primary50: "#ed6193",
            primary: "#ed6193",
          },
        })}
      />
      {errorMessage && <BaseErrorMessage text={error} />}
    </div>
  );
};

export default BaseSelectInput;
