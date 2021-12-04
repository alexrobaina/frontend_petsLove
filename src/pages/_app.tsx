import 'utils/i18n';
import 'styles/globals.scss';
import PetContext from 'Context/PetContext';
import RootStore from 'stores/RootStore';
import Navbar from 'components/Navbar';
import Footer from 'components/common/Footer';
import styles from './app.module.scss';

const rootStore = new RootStore();

const PetsLove = ({ Component, pageProps }) => {
  return (
    <PetContext.Provider value={rootStore}>
      <div className={styles.containerApp}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </PetContext.Provider>
  );
};

export default PetsLove;
