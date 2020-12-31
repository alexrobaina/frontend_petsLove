import 'utils/i18n';
import 'styles/globals.scss';
import PetContext from 'Context/PetContext';
import RootStore from 'stores/RootStore';
import Navbar from 'components/Navbar';
import Footer from 'components/common/Footer';

const rootStore = new RootStore();

const PetsLove = ({ Component, pageProps }) => {
  return (
    <PetContext.Provider value={rootStore}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </PetContext.Provider>
  );
};

export default PetsLove;
