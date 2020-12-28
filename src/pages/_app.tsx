import 'utils/i18n';
import 'styles/globals.scss';
import Navbar from 'components/Navbar';
import Footer from 'components/common/Footer';

const PetsLove = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default PetsLove;
