import { FC } from "react";
import styles from "./BaseErrorMessage.module.scss";

interface Props {
  text?: string;
}

const BaseErrorMessage: FC<Props> = ({ text }) => {
  return <div className={styles.text}>{text}</div>;
};

export default BaseErrorMessage;
