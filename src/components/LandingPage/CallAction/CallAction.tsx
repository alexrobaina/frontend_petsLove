import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './callAction.module.scss';
import PopUp from 'components/common/PopUp';
import Paragraph from 'components/common/Paragraph';
import ImageCenter from 'components/common/ImageCenter';

const CallAction = () => {
  const { t } = useTranslation('landingPage');
  const [adopterInformation, setAdopterInformation] = useState(false);
  const [shelterInformation, setShelterInformation] = useState(false);

  const closeModalAdopter = useCallback(() => {
    setAdopterInformation(false);
  }, []);

  const openModalAdopter = useCallback(() => {
    setAdopterInformation(true);
  }, []);

  const closeModalShelter = useCallback(() => {
    setShelterInformation(false);
  }, []);

  const openModalShelter = useCallback(() => {
    setShelterInformation(true);
  }, []);

  const goToSearch = useCallback(() => {
    closeModalAdopter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={styles.container}>
      <div role="button" onClick={openModalAdopter} className={styles.card}>
        <img
          alt="adopter"
          className={styles.image}
          src="/assets/images/landingPage/actions/adopter.png"
        />
        <div className={styles.action}>{t('adopt')}</div>
      </div>
      <div role="button" onClick={openModalShelter} className={styles.card}>
        <img
          alt="animalProtector"
          className={styles.image}
          src="/assets/images/landingPage/actions/dev.png"
        />
        <div className={styles.action}>{t('Dar en adopción')}</div>
      </div>
      <PopUp
        title={t('How to adopter?')}
        closeModal={closeModalAdopter}
        modalIsOpen={adopterInformation}
      >
        <Paragraph text={t('adopt:adoptInformation')} />
        <button onClick={goToSearch}>Buscar mascotas</button>
        <div className={styles.emoji}>😻</div>
      </PopUp>
      <PopUp
        title={t('Dar en adopción')}
        closeModal={closeModalShelter}
        modalIsOpen={shelterInformation}
      >
        <Paragraph text={t('Dar en adopción')} />
        <div className={styles.emoji}>😻</div>
      </PopUp>
    </div>
  );
};

export default CallAction;
