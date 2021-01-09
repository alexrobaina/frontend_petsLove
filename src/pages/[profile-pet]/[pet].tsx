import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';
import { ImLocation2 } from 'react-icons/im';
import { useTranslation } from 'react-i18next';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Seo from 'utils/Seo';
import { ImProfile, ImWhatsapp } from 'react-icons/im';
import GoogleMapsLocation from 'components/common/GoogleMapsLocation';
import Layout from 'components/common/Layout';
import ProfilePetStore from 'stores/ProfilePetStore';
import InformationCard from 'components/common/InformationCard';
import Link from 'next/link';
import Title from 'components/common/Title';
import { LANDING_PAGE } from 'pages/routes/routes';
import Button from 'components/common/Button';
import styles from './pet.module.scss';

const Pet = () => {
  const router = useRouter();
  const { t } = useTranslation('profile-pet');
  const profilePetStore = useLocalObservable(() => new ProfilePetStore());

  const handleOpenMap = useCallback(() => {
    profilePetStore.setOpenMapCard();
  }, []);

  const handleOpenHistory = useCallback(() => {
    profilePetStore.setOpenHistory();
  }, []);

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
        description={metaTags.description}
        baseUrl="https://pets-love.app"
      />
      <div className={styles.containerImageProfile}>
        {profilePetStore.pet ? (
          <img
            alt="pet"
            className={styles.imageProfile}
            src={profilePetStore.pet.image?.filenames[0]}
          />
        ) : (
          <img
            className={styles.imageProfile}
            alt="image-not-found"
            src="/assets/images/imageNotFound.jpg"
          />
        )}
      </div>
      <Link href={LANDING_PAGE}>
        <div className={styles.goToSearch}>
          <BiSearchAlt size={18} />
          <div className={styles.buttonSearch}>{t('goToSearch')}</div>
        </div>
      </Link>
      <Title text={`My name is ${profilePetStore.pet?.name}`} />
      <div className={styles.actions}>
        <Button icon={<ImProfile size={20} />} text="Peril del refugio" />
        <Button icon={<ImWhatsapp size={20} />} text="Contactar" />
      </div>
      <InformationCard
        handleOpen={handleOpenMap}
        map={<GoogleMapsLocation />}
        open={profilePetStore.openMapCard}
        icon={<ImLocation2 size={20} />}
        title={profilePetStore.pet?.textAddress}
      />
      <InformationCard
        title={t('history')}
        handleOpen={handleOpenHistory}
        text="xa.slhf ñasuifh añoausf añs"
        open={profilePetStore.openHistory}
      />
    </Layout>
  );
};

export default observer(Pet);
