import { FC, ReactChild, useCallback } from 'react';
import { GiCat } from 'react-icons/gi';
import { FaDog } from 'react-icons/fa';
import { GoSquirrel } from 'react-icons/go';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import c from 'classnames';
import styles from './filters.module.scss';

interface Props {
  text?: string;
  circle?: boolean;
  icon?: ReactChild;
  onClick?: Function;
  disabled?: boolean;
  secundary?: boolean;
  transparent?: boolean;
}

const Filters: FC<Props> = ({ onClick, disabled = true }) => {
  const click = useCallback(() => {
    onClick();
  }, []);

  return (
    <div className={styles.containerFilters}>
      <div className={c(styles.buttonFilter, disabled && styles.disabled)}>
        <GiCat size={20} />
      </div>
      <div className={c(styles.buttonFilter, disabled && styles.disabled)}>
        <FaDog size={20} />
      </div>
      <div className={c(styles.buttonFilter, disabled && styles.disabled)}>
        <GoSquirrel size={20} />
      </div>
      <div className={c(styles.buttonFilter, disabled && styles.disabled)}>
        <IoMdFemale size={20} />
      </div>
      <div className={c(styles.buttonFilter, disabled && styles.disabled)}>
        <IoMdMale size={20} />
      </div>
    </div>
  );
};

export default Filters;
