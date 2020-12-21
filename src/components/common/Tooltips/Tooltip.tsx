import { FC, ReactChild } from 'react';
import c from 'classnames';
import styles from './filters.module.scss';

interface Props {
  children: ReactChild;
}

const Tooltip: FC<Props> = ({ children }) => {
  return <div className={styles.containerFilters}>{children}</div>;
};

export default Tooltip;
