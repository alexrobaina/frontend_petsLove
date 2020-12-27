import 'utils/i18n';
import 'styles/globals.scss';
import Navbar from 'components/Navbar';

const PetsLove = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

export default PetsLove;
