import { FC } from "react";
import c from "classnames";
import styles from "./AlertMessage.module.scss";

interface Props {
  text: string;
  typeMessage: string;
}

const ErrorMessage: FC<Props> = ({ text, typeMessage }) => {
  return (
    <div
      className={c(
        styles.containerError,
        typeMessage === "error" && styles.error,
        typeMessage === "warning" && styles.warning
      )}
    >
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default ErrorMessage;
