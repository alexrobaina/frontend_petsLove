import { useCallback, useContext } from 'react';
import { BiHomeHeart } from 'react-icons/bi';
import { FcSearch } from 'react-icons/fc';
import PetContext from 'Context/PetContext';
import LinkButton from 'components/common/LinkButton';
import ChangeLanguage from './ChangeLanguage';
import styles from './navbar.module.scss';

const Navbar = () => {
  const rootStore = useContext(PetContext);
  const { searchPetStore } = rootStore;

  const handleResetPetsList = useCallback(() => {
    searchPetStore.resetPets();
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.col}>
        <div className={styles.containerButton}>
          <LinkButton
            url="/"
            icon={<BiHomeHeart size={25} />}
            onClick={handleResetPetsList}
          />
        </div>
        <div className={styles.menuLanguage}>
          <ChangeLanguage />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
