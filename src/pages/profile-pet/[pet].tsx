import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';
import { ImLocation2 } from 'react-icons/im';
import { GrNotes } from 'react-icons/gr';
import { RiFileHistoryLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { PROFILE_USER, LANDING_PAGE } from 'routes/routes';
import Seo from 'utils/Seo';
import 'react-toastify/dist/ReactToastify.css';
import GoogleMapsLocation from 'components/common/GoogleMapsLocation';
import Layout from 'components/common/Layout';
import ProfilePetStore from 'stores/ProfilePetStore';
import InformationCard from 'components/common/InformationCard';
import Title from 'components/common/Title';
import Gallery from 'components/common/Gallery';
import ImageProfile from 'components/common/ImageProfile';
import AlertToast from 'components/common/AlertToast';
import ActionsProfile from 'components/common/ActionsProfile';
import Back from 'components/common/Back';
import Notes from './components/Notes';
import ViewPetInfo from './components/ViewPetInfo';
import styles from './pet.module.scss';

const Pet = () => {
  const router = useRouter();
  const [toggleToast, setToggleToast] = useState(false);
  const { t } = useTranslation('profilePet');
  const profilePetStore = useLocalObservable(() => new ProfilePetStore());

  const handleToggleToast = useCallback((value) => {
    setToggleToast(value);
  }, []);

  const handleOpenMap = useCallback(() => {
    profilePetStore.setOpenMapCard();
  }, []);

  const handleOpenDescription = useCallback(() => {
    profilePetStore.setOpenDescription();
  }, []);

  const handleGoToProfile = useCallback(() => {
    router.push(`${PROFILE_USER}/${profilePetStore.pet?.getUserCreatorId}`);
  }, []);

  const capitalizeFormat = useCallback((name) => {
    if (name) {
      if (typeof name !== 'string') return '';
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return '';
  }, []);

  const handleWhatsapp = useCallback(() => {
    if (profilePetStore.pet?.userCreator?.phone) {
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
        text={t('common:phoneNotFound')}
        handleToggleToast={handleToggleToast}
      />
      {profilePetStore.pet?.images && (
        <ImageProfile
          image={`https://petslove-bucket-2.s3.amazonaws.com/pets/${profilePetStore.pet.images[0]}`}
        />
      )}
      <ActionsProfile
        handleWhatsapp={handleWhatsapp}
        handleGoToProfile={handleGoToProfile}
      />
      <Back
        route={LANDING_PAGE}
        text={t('goToSearch')}
        icon={<BiSearchAlt size={18} />}
      />
      <Title
        text={t('myNameIs', { name: capitalizeFormat(profilePetStore?.pet?.name) })}
      />
      <div className={styles.containerViewInfo}>
        <ViewPetInfo
          label={t('age')}
          capitalizeDisabled
          value={profilePetStore.pet?.age || 0}
        />
        <ViewPetInfo label={t('weight')} value={profilePetStore.pet?.weight} />
        <ViewPetInfo label={t('color')} value={profilePetStore.pet?.color} />
        <ViewPetInfo label={t('sex')} value={t(profilePetStore.pet?.gender)} />
      </div>
      {profilePetStore.pet?.description && (
        <InformationCard
          title={t('description')}
          handleOpen={handleOpenDescription}
          open={profilePetStore.openDescription}
          text={profilePetStore.pet.description}
          icon={<RiFileHistoryLine size={20} />}
        />
      )}
      {profilePetStore.pet?.textAddress && (
        <InformationCard
          handleOpen={handleOpenMap}
          icon={<ImLocation2 size={20} />}
          open={profilePetStore.openMapCard}
          title={profilePetStore.pet.textAddress}
          childrens={<GoogleMapsLocation position={profilePetStore.pet.location} />}
        />
      )}
      {profilePetStore.pet?.medicalNotes && (
        <InformationCard
          open
          title={t('medicalNotes')}
          icon={<GrNotes size={20} />}
          childrens={profilePetStore.pet.medicalNotes.map((note) => (
            <Notes
              key={note.title}
              title={note.title}
              description={note.description}
              date={moment(note.date).format('MM/DD/YYYY')}
            />
          ))}
        />
      )}
      <Gallery images={profilePetStore.pet?.images} />
    </Layout>
  );
};

export default observer(Pet);
