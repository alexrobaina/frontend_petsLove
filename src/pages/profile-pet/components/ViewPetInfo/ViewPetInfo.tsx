import { FC } from 'react';
import c from 'classnames';
import styles from './viewPetInfo.module.scss';

interface Props {
  label: string;
  value?: string;
  capitalizeDisabled?: boolean;
}

const ViewPetInfo: FC<Props> = ({ label, value = '?', capitalizeDisabled = false }) => {
  return (
    <div className={styles.containerInformation}>
      <h2 className={styles.label}>{label}</h2>
      <p className={c(styles.value, capitalizeDisabled && styles.capitalizeDisabled)}>
        {value}
      </p>
    </div>
  );
};

export default ViewPetInfo;
