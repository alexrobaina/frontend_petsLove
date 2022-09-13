import { FC } from 'react';
import c from 'classnames';
import styles from './BaseLabel.module.scss';

interface Props {
  text: string;
  bold?: boolean;
  marginBottom?: number;
}

const BaseLabel: FC<Props> = ({ text, bold, marginBottom = 0 }) => {
  return (
    <div style={{ marginBottom }}>
      <label className={c(styles.label, bold && styles.bold)}>{text}</label>
    </div>
  );
};

export default BaseLabel;
