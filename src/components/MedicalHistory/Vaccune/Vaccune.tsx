import { FC } from 'react';
import c from 'classnames';
import { FaHeartbeat } from 'react-icons/fa';
import { BiCalendarHeart } from 'react-icons/bi';
import styles from './vaccune.module.scss';

interface Props {
  name: string;
  date: string;
}

const Vaccune: FC<Props> = ({ name, date }) => {
  return (
    <div className={styles.containerVaccine}>
      <div className={styles.vaccine}>
        <FaHeartbeat size={18} />
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.vaccine}>
        <BiCalendarHeart size={20} />
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  );
};

export default Vaccune;
