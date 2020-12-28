import { useTranslation } from 'react-i18next';
import Seo from 'utils/Seo';
import Title from 'components/common/Title';
import Layout from 'components/common/Layout';
import ImageCenter from 'components/common/ImageCenter';
import Paragraph from 'components/common/Paragraph';
import styles from 'styles/index.module.scss';

const ShelterInformation = () => {
  const { t } = useTranslation('home');

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={t('title')}
        description={t('description')}
        baseUrl="https://pets-love.app"
      />
      <main className={styles.main}>
        shelter
        {/* <Title typeTag="h2" text={t('shelterInformation')} />
        <ImageCenter image="/assets/images/landingPage/friendAndDog.jpg" />
        <Paragraph text={t('whatIsPetsLove')} />
        <Title typeTag="h2" text={t('¿Que te gustaría hacer?')} /> */}
      </main>
    </Layout>
  );
};

export default ShelterInformation;
