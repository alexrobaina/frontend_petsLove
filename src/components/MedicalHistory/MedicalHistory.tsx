import { FC, ReactNode } from 'react';
import c from 'classnames';
import { BsCaretDownFill } from 'react-icons/bs';
import MedicalItemsContainer from './MedicalItemsContainer';
import styles from './medicalHistory.module.scss';
import Vaccune from './Vaccune';
import { useTranslation } from 'react-i18next';

interface Props {
  notes: string;
  title: string;
  open: boolean;
  map?: ReactNode;
  itemType?: string;
  icon?: ReactNode;
  medicalItems?: Array<any>;
  handleOpen: (e) => void;
  distemperVaccine?: string;
}

const MedicalHistory: FC<Props> = ({
  notes,
  handleOpen,
  title = '',
  icon = null,
  open = false,
  itemType = '',
  medicalItems = [],
}) => {
  const { t } = useTranslation('profile-pet');

  return (
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
            <div className={styles.titleContentItems}>{itemType}</div>
            {medicalItems !== [] ? (
              medicalItems.map((medicalItem, i) => {
                return (
                  <Vaccune key={i} name={medicalItem.vaccine} date={medicalItem.date} />
                );
              })
            ) : (
              <div>sin vacunas registradas</div>
            )}
            {notes && (
              <>
                <div className={styles.titleContentNotes}>{t('notes')}</div>
                <div className={styles.notes}>{notes}</div>
              </>
            )}
          </MedicalItemsContainer>
        )}
      </>
    </div>
  );
};

export default MedicalHistory;
