import { useTranslation } from 'react-i18next';
import Seo from 'utils/Seo';
import Title from 'components/common/Title';
import Layout from 'components/common/Layout';
import ImageCenter from 'components/common/ImageCenter';
import LinkButton from 'components/common/LinkButton';
import Paragraph from 'components/common/Paragraph';
import styles from 'styles/index.module.scss';

const ShelterInformation = () => {
  const { t } = useTranslation('shelter');

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={t('title')}
        description={t('descriptionP1')}
        baseUrl="https://pets-love.app"
      />
      <main className={styles.main}>
        <Title text={t('¡Te ayudamos a dar mascotas en adopción!')} />
        <ImageCenter image="/assets/images/landingPage/shelter.jpg" />
        <Paragraph text={t('descriptionP1')} />
        <Paragraph text={t('descriptionP2')} />
        <Title typeTag="h2" text={t('¿Como usar pets love?')} />
        <Paragraph text={t('descriptionP2')} />
        <Paragraph text={t('descriptionP2')} />
        <Paragraph text={t('descriptionP2')} />
        <Title typeTag="h2" text={t('Descargar')} />
        <LinkButton url="/search" text={t('searchPet')} />
      </main>
    </Layout>
  );
};

export default ShelterInformation;
