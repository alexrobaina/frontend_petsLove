import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ImLocation2 } from 'react-icons/im';
import { MdPersonPin } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Seo from 'utils/Seo';
import GoogleMapsLocation from 'components/common/GoogleMapsLocation';
import Layout from 'components/common/Layout';
import ProfileShelterStore from 'stores/ProfileShelterStore';
import InformationCard from 'components/common/InformationCard';
import Title from 'components/common/Title';
import AnimalNavigator from 'components/AnimalNavigator';
import ActionsProfile from 'components/common/ActionsProfile';
import AlertToast from 'components/common/AlertToast';
import ImageProfile from 'components/common/ImageProfile';
import { LIMIT_SEARCH } from 'services/config';
import PetsList from 'components/PetsList';
import PaginationList from 'components/common/PaginationList';
import styles from './shelter.module.scss';

const Shelter = () => {
  const router = useRouter();
  const shelterId = router.query.shelter;
  const [toggleToast, setToggleToast] = useState(false);
  const { t } = useTranslation('profileShelter');
  const profileShelterStore = useLocalObservable(() => new ProfileShelterStore());

  const handleToggleToast = useCallback((value) => {
    setToggleToast(value);
  }, []);

  const handleOpenMap = useCallback(() => {
    profileShelterStore.setOpenMapCard();
  }, []);

  const handleOpenRequirements = useCallback(() => {
    profileShelterStore.setOpenRequirements();
  }, []);

  const handleOpenAboutUs = useCallback(() => {
    profileShelterStore.setOpenAboutUs();
  }, []);

  const handleFilterPets = useCallback(
    (typePet) => {
      profileShelterStore.setPage(1);
      profileShelterStore.setCategory(typePet);
      profileShelterStore.getCategoryUserFilterPet(
        typePet,
        shelterId,
        LIMIT_SEARCH,
        profileShelterStore.page,
      );
    },
    [router.query.shelter],
  );

  const handleChangePage = useCallback(
    (e, newPage) => {
      profileShelterStore.setPage(newPage);
      if (profileShelterStore.categorySelected) {
        profileShelterStore.getCategoryUserFilterPet(
          profileShelterStore.categorySelected,
          router.query.shelter,
          LIMIT_SEARCH,
          profileShelterStore.page,
        );
      } else {
        profileShelterStore.getCategoryUserFilterPet(
          '',
          router.query.shelter,
          LIMIT_SEARCH,
          newPage,
        );
      }
    },
    [router.query.shelter, profileShelterStore.categorySelected],
  );

  const capitalizeFormat = useCallback((name) => {
    if (typeof name !== 'string') return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  const handleWhatsapp = useCallback(() => {
    if (profileShelterStore.shelter?.phone) {
      window.open(
        `https://api.whatsapp.com/send?phone=${profileShelterStore.shelter.phone}`,
      );
    } else {
      setToggleToast(true);
    }
  }, []);

  useEffect(() => {
    if (router.query.shelter) {
      profileShelterStore.searchShelter(router.query.shelter);
      profileShelterStore.getCategoryUserFilterPet(
        profileShelterStore.categorySelected,
        router.query.shelter,
        LIMIT_SEARCH,
        1,
      );
    }
  }, [router.query.shelter]);

  const metaTags = {
    title: t('shelter'),
    description: profileShelterStore?.shelter?.aboutUs || '',
  };

  return (
    <Layout>
      <Seo
        myApp="Pets love"
        title={metaTags.title}
        // This URL Don't exist
        baseUrl="https://pets-love.app"
        description={metaTags.description}
      />
      <AlertToast
        text={t('common:phoneNotFound')}
        toggleToast={toggleToast}
        handleToggleToast={handleToggleToast}
      />
      <ImageProfile image={profileShelterStore?.shelter?.image[0] || null} />
      <ActionsProfile handleWhatsapp={handleWhatsapp} />
      <Title text={capitalizeFormat(profileShelterStore?.shelter?.name)} />
      <div className={styles.emailText}>{profileShelterStore.shelter.email}</div>
      {profileShelterStore.shelter?.aboutUs && (
        <InformationCard
          title={t('aboutUs')}
          handleOpen={handleOpenAboutUs}
          icon={<MdPersonPin size={22} />}
          open={profileShelterStore.openAboutUs}
          text={profileShelterStore.shelter?.aboutUs}
        />
      )}
      {profileShelterStore.shelter?.requirementsToAdopt && (
        <InformationCard
          title={t('requirementsToAdopt')}
          icon={<MdPersonPin size={22} />}
          handleOpen={handleOpenRequirements}
          open={profileShelterStore.openRequirements}
          text={profileShelterStore.shelter?.requirementsToAdopt}
        />
      )}
      {profileShelterStore.shelter?.location && (
        <InformationCard
          handleOpen={handleOpenMap}
          icon={<ImLocation2 size={20} />}
          open={profileShelterStore.openMapCard}
          title={profileShelterStore.shelter?.textAddress}
          childrens={
            <GoogleMapsLocation position={profileShelterStore.shelter.location} />
          }
        />
      )}
      <AnimalNavigator
        selected={profileShelterStore.categorySelected}
        handleFilterPets={handleFilterPets}
      />
      <PetsList store={profileShelterStore} />
      {profileShelterStore.pets.length > 0 && (
        <PaginationList
          limit={LIMIT_SEARCH}
          page={profileShelterStore.page}
          handleChange={handleChangePage}
          total={profileShelterStore.totalPets}
        />
      )}
    </Layout>
  );
};

export default observer(Shelter);
