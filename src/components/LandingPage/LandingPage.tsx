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
      <Title text={t('weHelpYouFindAPet')} />
      <Paragraph text={t('whatIsPetsLove')} />
      <Title text={t('¿Que te gustaría hacer?')} />
      <CallAction />
      <Title text={t('Ideales')} />
      <Paragraph
        text={t(
          'Pets love nace de la idea de que todos podemos ser felices si tenemos los recursos necesarios. Las mascotas necesitan de nosotros para poder tener una vida llena de momentos agradables y la tecnología nos brinda la posibilidad de construir esa realidad.',
        )}
      />
      <ImageCenter image="/assets/images/landingPage/pcGatito.jpg" />
      <Title text={t('Adopción responsable.')} />
      <Paragraph
        text={t(
          'Al momento de adoptar una mascota el proteccionista y el adoptante podrán hacer de forma más precisa el seguimiento de los principales cuidados de la mascota. Construimos un flujo de información más exacta con los datos veterinarios de la salud de nuestro amigo y fotografías que nos permitirán ver un historial que busca garantizar la seguridad y salud del mismo.',
        )}
      />
      <Title text={t('¿Te gustaría ser voluntario?')} />
      <Paragraph
        text={t(
          'Si te apasionan los animales y quieres formar parte del cuidado de mascotas durante el proceso de adopción, regístrate como voluntario para que los refugios puedan contactarte. Participando como voluntario vas a tener un registro de las mascotas que cuidaste y poder compartir información precisa al refugio y el adoptante. El trabajo de todos es importante, a veces transitar es dar el amor necesario para recuperar la felicidad de nuestro amigo!',
        )}
      />
    </>
  );
};

export default LandingPage;
