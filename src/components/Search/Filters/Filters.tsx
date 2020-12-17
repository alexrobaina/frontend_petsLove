import { FC, ReactChild, useCallback } from 'react';
import c from 'classnames';
import styles from './filters.module.scss';

interface Props {
  text?: string;
  circle?: boolean;
  icon?: ReactChild;
  onClick?: Function;
  secundary?: boolean;
  transparent?: boolean;
}

const Filters: FC<Props> = ({ icon, text, circle, transparent, onClick, secundary }) => {
  const click = useCallback(() => {
    onClick();
  }, []);

  return <div>filters buttons</div>;
};

export default Filters;
