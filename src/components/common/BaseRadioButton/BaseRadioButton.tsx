import { useGetVariableColor } from "hooks/useGetVariableColor";
import {
  FC,
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import BaseText from "../BaseText";
import styles from "./BaseRadioButton.module.scss";

interface Props {
  value?: any;
  text?: string;
  inputName?: string;
  setFieldValue?: any;
  errorMessage?: string;
}

const BaseRadioButton: FC<Props> = ({
  value,
  text = "",
  inputName,
  errorMessage,
  setFieldValue,
}) => {
  const colorError = useGetVariableColor("--input-error");

  const handleChangeCallback = useCallback(() => {
    setFieldValue(inputName, !value);
  }, [value]);

  return (
    <label className={styles.container}>
      <input type="radio" value={value} checked={value} name={inputName} />
      <BaseText
        bold
        text={text}
        marginLeft={5}
        onClick={handleChangeCallback}
        color={errorMessage && colorError}
      />
    </label>
  );
};

export default BaseRadioButton;
