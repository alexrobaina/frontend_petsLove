import { FC, ReactNode } from 'react';
import c from 'classnames';
import { BsCaretDownFill } from 'react-icons/bs';
import { BiCalendarHeart } from 'react-icons/bi';
import { FaHeartbeat } from 'react-icons/fa';
import MedicalItemsContainer from './MedicalItemsContainer';
import styles from './medicalHistory.module.scss';
import { log } from 'util';
import Vaccune from './Vaccune';

interface Props {
  notes: string;
  title: string;
  open: boolean;
  map?: ReactNode;
  icon?: ReactNode;
  typePet: string;
  medicalItems: Array<any>;
  handleOpen: (e) => void;

  distemperVaccine?: string;
}

const MedicalHistory: FC<Props> = ({
  notes,
  typePet,
  handleOpen,
  title = '',
  icon = null,
  open = false,
  medicalItems,
}) => {
  return (
    <>
      <div className={c(styles.body, open && styles.open)}>
        <div onClick={handleOpen} className={c(styles.header, open && styles.open)}>
          <div className={styles.titleContainer}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={c(styles.title, open && styles.open)}>{title}</div>
          </div>
          <div className={c(styles.icon, open && styles.open)}>
            <BsCaretDownFill size={20} />
          </div>
        </div>
        <>
          {open && (
            <MedicalItemsContainer>
              <div className={styles.titleContentItems}>Vaccine</div>
              {medicalItems.map((medicalItem) => {
                return <Vaccune name={medicalItem.vaccine} date={medicalItem.date} />;
              })}
              <div className={styles.titleContentNotes}>Notes</div>
              <div className={styles.notes}>{notes}</div>
            </MedicalItemsContainer>
          )}
        </>
      </div>
    </>
  );
};

export default MedicalHistory;
