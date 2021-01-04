import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BiSearchAlt } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Seo from 'utils/Seo';
import { ImProfile, ImWhatsapp } from 'react-icons/im';
import Layout from 'components/common/Layout';
import ProfilePetStore from 'stores/ProfilePetStore';
import Link from 'next/link';
import Title from 'components/common/Title';
import { LANDING_PAGE } from 'pages/routes/routes';
import Button from 'components/common/Button';
import styles from './pet.module.scss';

const Pet = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const profilePetStore = useLocalObservable(() => new ProfilePetStore());

  useEffect(() => {
    if (router.query.pet) {
      profilePetStore.searchPet(router.query.pet);
    }
  }, [router.query.pet]);

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={t('Mascota en adopción')}
        // description={t('description')}
        baseUrl="https://pets-love.app"
      />
      <div className={styles.containerImageProfile}>
        {profilePetStore.pet ? (
          <img
            className={styles.imageProfile}
            alt="dog and friend"
            src={profilePetStore.pet.image?.filenames[0]}
          />
        ) : (
          <img
            className={styles.imageProfile}
            alt="dog and friend"
            src="/assets/images/imageNotFound.jpg"
          />
        )}
      </div>
      <Link href={LANDING_PAGE}>
        <div className={styles.goToSearch}>
          <BiSearchAlt size={18} />
          <div className={styles.buttonSearch}>Ir al buscador</div>
        </div>
      </Link>
      <Title text={`My name is ${profilePetStore.pet?.name}`} />
      <div className={styles.actions}>
        <Button icon={<ImProfile size={20} />} text="Peril del refugio" />
        <Button icon={<ImWhatsapp size={20} />} text="Contactar" />
      </div>
    </Layout>
  );
};

export default observer(Pet);
