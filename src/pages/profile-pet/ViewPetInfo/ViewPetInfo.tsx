import { FC } from 'react';
import styles from './viewPetInfo.module.scss';

interface Props {
  label: string;
  value?: string;
}

const ViewPetInfo: FC<Props> = ({ label, value = '?' }) => {
  return (
    <div className={styles.containerInformation}>
      <h2 className={styles.label}>{label}</h2>
      <p className={styles.value}>{value}</p>
    </div>
  );
};

export default ViewPetInfo;
