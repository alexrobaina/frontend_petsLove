import { FC } from "react";
import { FaCheck } from "react-icons/fa";

import styles from "./BaseCheckbox.module.scss";

interface Props {
  text?: string;
  value?: string | number;
  inputId?: string;
  checked: boolean;
  handleSelect: (e: any) => void;
}

const BaseCheckbox: FC<Props> = ({ value, inputId, checked, handleSelect }) => {
  return (
    <label className={styles.container}>
      <input
        id={inputId}
        value={value}
        type="checkbox"
        checked={checked}
        onChange={handleSelect}
      />
      <span className={styles.checkmark}>
        {checked && <FaCheck size={12} className={styles.icon} />}
      </span>
    </label>
  );
};

export default BaseCheckbox;
