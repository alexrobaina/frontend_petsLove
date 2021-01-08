import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GrApple, GrAndroid } from 'react-icons/gr';
import styles from './callAction.module.scss';
import { LIMIT_SEARCH } from 'services/config';
import PetContext from 'Context/PetContext';
import PopUp from 'components/common/PopUp';
import Paragraph from 'components/common/Paragraph';
import Button from 'components/common/Button';
import Title from 'components/common/Title';

const CallAction = () => {
  const rootStore = useContext(PetContext);
  const { searchPetStore } = rootStore;
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
    searchPetStore.searchPets(LIMIT_SEARCH, 1);
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
        <div className={styles.action}>{t('putUpAdoption')}</div>
      </div>
      <PopUp
        title={t('adopt')}
        closeModal={closeModalAdopter}
        modalIsOpen={adopterInformation}
      >
        <div className={styles.contentAdopterModal}>
          <Paragraph text={t('adoptInformation')} />
          <div className={styles.containerButton}>
            <Button onClick={goToSearch} text={t('searchPet')} />
          </div>
        </div>
      </PopUp>
      <PopUp
        title={t('putUpAdoption')}
        closeModal={closeModalShelter}
        modalIsOpen={shelterInformation}
      >
        <div className={styles.contentAdopterModal}>
          <Paragraph text={t('putUpAdoptionTextP1')} />
          <Paragraph text={t('putUpAdoptionTextP2')} />
          <Title text={t('download')} />
          <div className={styles.containerButton}>
            <Button
              onClick={goToSearch}
              text={t('Iphone')}
              icon={<GrApple size={18} />}
            />
            <Button
              onClick={goToSearch}
              text={t('Android')}
              icon={<GrAndroid size={18} />}
            />
          </div>
        </div>
      </PopUp>
    </div>
  );
};

export default CallAction;
