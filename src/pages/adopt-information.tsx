import { useTranslation } from 'react-i18next';
import Seo from 'utils/Seo';
import Title from 'components/common/Title';
import Layout from 'components/common/Layout';
import ImageCenter from 'components/common/ImageCenter';
import Paragraph from 'components/common/Paragraph';
import LinkButton from 'components/common/LinkButton';
import styles from 'styles/adopt.module.scss';

const ShelterInformation = () => {
  const { t } = useTranslation('adopt');

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={t('adoptTitle')}
        description={t('description')}
        baseUrl="https://pets-love.app"
      />
      <main className={styles.main}>
        <Title text={t('adoptTitle')} />
        <ImageCenter image="/assets/images/landingPage/adopt.jpg" />
        <Paragraph text={t('adoptInformation')} />
        <LinkButton url="/search" text="buscar una mascota" />
        <div className={styles.emoji}>😻</div>
      </main>
    </Layout>
  );
};

export default ShelterInformation;
