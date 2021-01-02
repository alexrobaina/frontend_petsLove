import { useTranslation } from 'react-i18next';
import Seo from 'utils/Seo';
import Title from 'components/common/Title';
import Layout from 'components/common/Layout';
import ImageCenter from 'components/common/ImageCenter';
import Paragraph from 'components/common/Paragraph';
import LinkButton from 'components/common/LinkButton';
import styles from 'styles/adopt.module.scss';

const VolanteerInformation = () => {
  const { t } = useTranslation('volanteer');

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={t('title')}
        description={t('descriptionP1')}
        baseUrl="https://pets-love.app"
      />
      <main className={styles.main}>
        <Title text={t('title')} />
        <ImageCenter image="/assets/images/landingPage/transito.jpg" />
        <Paragraph text={t('descriptionP1')} />
        <Paragraph text={t('descriptionP2')} />
        <LinkButton url="/search" text={t('searchPet')} />
      </main>
    </Layout>
  );
};

export default VolanteerInformation;
