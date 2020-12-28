import { useTranslation } from 'react-i18next';
import ImageCenter from 'components/common/ImageCenter';
import Title from 'components/common/Title';
import CallAction from './CallAction';
import Paragraph from 'components/common/Paragraph';

const LandingPage = () => {
  const { t } = useTranslation('landingPage');
  return (
    <>
      <ImageCenter image="/assets/images/landingPage/friendAndDog.jpg" />
      <Title typeTag="h2" text={t('weHelpYouFindAPet')} />
      <Paragraph text={t('whatIsPetsLove')} />
      <Title typeTag="h2" text={t('¿Que te gustaría hacer?')} />
      <CallAction />
      <Title typeTag="h2" text={t('philosophy')} />
      <Paragraph text={t('philosophyText')} />
      <ImageCenter image="/assets/images/landingPage/pcGatito.jpg" />
      <Title text={t('responsibleAdoption')} />
      <Paragraph text={t('responsibleAdoptionText')} />
    </>
  );
};

export default LandingPage;
