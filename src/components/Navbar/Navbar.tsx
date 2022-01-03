import { useCallback, useContext } from 'react';
import { BiHomeHeart } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
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
          <a
            href={`${process.env.REACT_APP_PETS_LOVE_WEB_APP}/`}
            className={styles.login}
          >
            <CgProfile size={25} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
