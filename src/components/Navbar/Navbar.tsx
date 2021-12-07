import { useCallback, useContext } from 'react';
import { BiHomeHeart } from 'react-icons/bi';
import PetContext from 'Context/PetContext';
import LinkButton from 'components/common/LinkButton';
import ChangeLanguage from './ChangeLanguage';
import styles from './navbar.module.scss';

const Navbar = () => {
  const rootStore = useContext(PetContext);
  const { searchPetStore } = rootStore;

  const handleResetPetsList = useCallback(() => {
    searchPetStore.handleCats(false);
    searchPetStore.handleDogs(false);
    searchPetStore.handleMale(false);
    searchPetStore.handleExotic(false);
    searchPetStore.handleFemale(false);
    searchPetStore.resetPets();
  }, []);

  const gotToLogin = () => {
    window.location.replace(`${process.env.REACT_APP_PETS_LOVE_WEB_APP}/login`);
  };

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
        <div className={styles.navegation}>
          <ChangeLanguage />
          <div onClick={() => gotToLogin()} className={styles.login}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
