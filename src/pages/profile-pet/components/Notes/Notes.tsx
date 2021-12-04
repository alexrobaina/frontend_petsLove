import { FC } from 'react';
import styles from './notes.module.scss';

interface Props {
  date: any;
  title: string;
  description: string;
}

const Notes: FC<Props> = ({ title, date, description }) => {
  return (
    <div className={styles.notesContainer}>
      <div className={styles.containerHeaderNotes}>
        <div className={styles.titleNotes}>{title}</div>
        <div className={styles.dateNotes}>{date}</div>
      </div>
      <div className={styles.textNotes}>{description}</div>
    </div>
  );
};

export default Notes;
