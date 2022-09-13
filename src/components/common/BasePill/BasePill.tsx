import { FC } from 'react';
import c from 'classnames';
import BaseText from '../BaseText';
import styles from './BasePill.module.scss';

interface Props {
  text: string;
  size?: number;
  testId?: string;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  backgroundColor: string;
}

const BasePill: FC<Props> = ({
  text,
  size,
  testId,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  backgroundColor,
}) => {
  return (
    <div
      style={{
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        fontSize: size,
        backgroundColor,
      }}
      data-testid={`text-${testId}`}
      className={c(styles.pill)}
    >
      <BaseText color="#fff" size={15} text={text} />
    </div>
  );
};

export default BasePill;
