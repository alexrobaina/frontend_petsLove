import { FC, ReactNode } from "react";
import c from "classnames";
import styles from "./buttonFilter.module.scss";

interface Props {
  handleSelected: (e: any) => void;
  icon: ReactNode;
  isSelected?: boolean;
}

const ButtonFilter: FC<Props> = ({ handleSelected, icon, isSelected }) => {
  return (
    <div
      onClick={handleSelected}
      className={c(styles.buttonFilter, isSelected && styles.active)}
    >
      {icon}
    </div>
  );
};

export default ButtonFilter;
