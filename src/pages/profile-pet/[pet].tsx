import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BiSearchAlt } from 'react-icons/bi';
import { FaNotesMedical } from 'react-icons/fa';
import { ImWhatsapp, ImLocation2 } from 'react-icons/im';
import { RiFileHistoryLine, RiUserHeartFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { PROFILE_SHELTER, LANDING_PAGE } from 'routes/routes';
import Seo from 'utils/Seo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleMapsLocation from 'components/common/GoogleMapsLocation';
import Layout from 'components/common/Layout';
import ProfilePetStore from 'stores/ProfilePetStore';
import InformationCard from 'components/common/InformationCard';
import MedicalHistory from 'components/MedicalHistory';
import Title from 'components/common/Title';
import Gallery from 'components/common/Gallery';
import Button from 'components/common/Button';
import ImageProfile from 'components/common/ImageProfile';
import AlertToast from 'components/common/AlertToast/AlertToast';
import ViewPetInfo from './ViewPetInfo';
import styles from './pet.module.scss';

const Pet = () => {
  const router = useRouter();
  const [toggleToast, setToggleToast] = useState(false);
  const { t } = useTranslation('profile-pet');
  const profilePetStore = useLocalObservable(() => new ProfilePetStore());

  const handleToggleToast = useCallback((value) => {
    setToggleToast(value);
  }, []);

  const handleOpenMap = useCallback(() => {
    profilePetStore.setOpenMapCard();
  }, []);

  const handleOpenMedicalCard = useCallback(() => {
    profilePetStore.setOpenMedicalCard();
  }, []);

  const handleOpenHistory = useCallback(() => {
    profilePetStore.setOpenHistory();
  }, []);

  const handleGoToProfile = useCallback(() => {
    router.push(`${PROFILE_SHELTER}/petIdStore.pet.getUserCreatorId}`);
  }, []);

  const formatName = useCallback((name) => {
    if (typeof name !== 'string') return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  const handleWhatsapp = useCallback(() => {
    if (false) {
      window.open(
        `https://api.whatsapp.com/send?phone=${profilePetStore.pet?.userCreator?.phone}`,
      );
    } else {
      setToggleToast(true);
    }
  }, [profilePetStore.pet?.userCreator?.phone]);

  useEffect(() => {
    if (router.query.pet) {
      profilePetStore.searchPet(router.query.pet);
    }
  }, [router.query.pet]);

  const metaTags = {
    goToSearch: t('goToSearch'),
    description: profilePetStore.pet?.history || '',
  };

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={metaTags.goToSearch}
        baseUrl="https://pets-love.app"
        description={metaTags.description}
      />
      <AlertToast
        toggleToast={toggleToast}
        text={t('phoneNotFound')}
        handleToggleToast={handleToggleToast}
      />
      <ImageProfile image={profilePetStore.pet?.image?.filenames[0] || null} />
      <div className={styles.containerActions}>
        <div className={styles.action}>
          <Button
            circle
            onClick={handleGoToProfile}
            icon={<RiUserHeartFill size={20} />}
          />
        </div>
        <div className={styles.action}>
          <Button circle onClick={handleWhatsapp} icon={<ImWhatsapp size={20} />} />
        </div>
      </div>
      <Link href={LANDING_PAGE}>
        <div className={styles.goToSearch}>
          <BiSearchAlt size={18} />
          <div className={styles.buttonSearch}>{t('goToSearch')}</div>
        </div>
      </Link>
      <Title text={t('myNameIs', { name: formatName(profilePetStore.pet?.name) })} />
      <div className={styles.containerViewInfo}>
        <ViewPetInfo label={t('age')} value={profilePetStore.pet?.age} />
        <ViewPetInfo label={t('height')} value={profilePetStore.pet?.height} />
        <ViewPetInfo label={t('color')} value={profilePetStore.pet?.color} />
        <ViewPetInfo label={t('sex')} value={t(profilePetStore.pet?.gender)} />
      </div>
      {profilePetStore.pet?.history && (
        <InformationCard
          title={t('history')}
          handleOpen={handleOpenHistory}
          open={profilePetStore.openHistory}
          text={profilePetStore.pet?.history}
          icon={<RiFileHistoryLine size={20} />}
        />
      )}
      <MedicalHistory
        title={t('medicalCard')}
        notes={profilePetStore.pet?.notes}
        handleOpen={handleOpenMedicalCard}
        icon={<FaNotesMedical size={20} />}
        open={profilePetStore.openMedicalCard}
        typePet={profilePetStore.pet?.category}
        medicalItems={[
          {
            vaccine: 'Bordetella bronchiseptic vaccine',
            date: '12/08/2020',
          },
          {
            vaccine: 'Bordetella bronchiseptic vaccine',
            date: '12/08/2020',
          },
          {
            vaccine: 'Bordetella bronchiseptic vaccine',
            date: '12/08/2020',
          },
        ]}
      />
      {profilePetStore.pet?.textAddress && (
        <InformationCard
          handleOpen={handleOpenMap}
          map={<GoogleMapsLocation />}
          icon={<ImLocation2 size={20} />}
          open={profilePetStore.openMapCard}
          title={profilePetStore.pet?.textAddress}
        />
      )}
      <Gallery images={profilePetStore.pet?.image?.filenames} />
    </Layout>
  );
};

export default observer(Pet);
