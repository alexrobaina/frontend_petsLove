import { FC } from 'react';
import styles from './paragraph.module.scss';

interface Props {
  text: string;
}

const Paragraph: FC<Props> = ({ text }) => {
  return (
    <div className={styles.paragraph}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Paragraph;
