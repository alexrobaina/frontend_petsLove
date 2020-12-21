import { FC } from 'react';
import { GiCat } from 'react-icons/gi';
import { FaDog } from 'react-icons/fa';
import { GoSquirrel } from 'react-icons/go';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { observer } from 'mobx-react-lite';
import c from 'classnames';
import SearchPetStore from 'stores/SearchPetStore';
import styles from './filters.module.scss';

interface Props {
  searchPetStore: SearchPetStore;
}

const Filters: FC<Props> = ({ searchPetStore }) => {
  const handleSelectCats = () => {
    searchPetStore.handleCats(true);
    searchPetStore.handleDogs(false);
    searchPetStore.handleExotic(false);
    searchPetStore.handleCategory('cat');
    searchPetStore.searchPets();
  };

  const handleSelectDogs = () => {
    searchPetStore.handleCats(false);
    searchPetStore.handleDogs(true);
    searchPetStore.handleExotic(false);
    searchPetStore.handleCategory('dog');
    searchPetStore.searchPets();
  };

  const handleSelectExotics = () => {
    searchPetStore.handleCats(false);
    searchPetStore.handleDogs(false);
    searchPetStore.handleExotic(true);
    searchPetStore.handleCategory('exotic');
    searchPetStore.searchPets();
  };

  const handleSelectFemale = () => {
    searchPetStore.handleFemale(true);
    searchPetStore.handleMale(false);
    searchPetStore.handleGender('female');
    searchPetStore.searchPets();
  };

  const handleSelectMale = () => {
    searchPetStore.handleMale(true);
    searchPetStore.handleFemale(false);
    searchPetStore.handleGender('male');
    searchPetStore.searchPets();
  };

  const { male, dogs, cats, female, exotics } = searchPetStore;

  return (
    <div className={styles.containerFilters}>
      <div
        onClick={handleSelectCats}
        className={c(styles.buttonFilter, cats && styles.active)}
      >
        <GiCat size={26} />
      </div>
      <div
        onClick={handleSelectDogs}
        className={c(styles.buttonFilter, dogs && styles.active)}
      >
        <FaDog size={26} />
      </div>
      <div
        onClick={handleSelectExotics}
        className={c(styles.buttonFilter, exotics && styles.active)}
      >
        <GoSquirrel size={26} />
      </div>
      <div
        role="button"
        onClick={handleSelectFemale}
        className={c(styles.buttonFilter, female && styles.active)}
      >
        <IoMdFemale size={26} />
      </div>
      <div
        onClick={handleSelectMale}
        className={c(styles.buttonFilter, male && styles.active)}
      >
        <IoMdMale size={26} />
      </div>
    </div>
  );
};

export default observer(Filters);
