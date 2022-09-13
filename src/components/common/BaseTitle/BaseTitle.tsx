import { FC } from 'react';
import c from 'classnames';
import styles from './BaseTitle.module.scss';

interface Props {
  size?: number;
  title?: string;
  testId?: string;
  center?: boolean;
  pointer?: boolean;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}

const BaseTitle: FC<Props> = ({
  size,
  title,
  testId,
  center,
  pointer,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
}) => {
  return (
    <div
      data-testid={`title-${testId}`}
      style={{ fontSize: size, marginTop, marginLeft, marginRight, marginBottom }}
      className={c(styles.title, center && styles.center, pointer && styles.pointer)}
    >
      {title}
    </div>
  );
};

export default BaseTitle;
