import { FC } from 'react';
import styles from './informationCard.module.scss';

interface Props {
  title: string;
  petId?: string;
  image?: string;
}

const InformationCard: FC<Props> = ({ title = '', image = '', petId = '' }) => {
  return (
    <div className={styles.containerCard}>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default InformationCard;
