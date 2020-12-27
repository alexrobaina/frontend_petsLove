import { FC } from 'react';
import { GiCat } from 'react-icons/gi';
import { FaDog } from 'react-icons/fa';
import { GoSquirrel } from 'react-icons/go';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { observer } from 'mobx-react-lite';
import c from 'classnames';
import { LIMIT_SEARCH } from 'services/config';
import SearchPetStore from 'stores/SearchPetStore';
import styles from './filters.module.scss';

interface Props {
  searchPetStore: SearchPetStore;
}

const Filters: FC<Props> = ({ searchPetStore }) => {
  const { male, dogs, cats, female, exotics } = searchPetStore;

  const handleSelectCats = () => {
    searchPetStore.handleCats(!cats);
    searchPetStore.handleDogs(false);
    searchPetStore.handleExotic(false);
    searchPetStore.handleCategory(cats ? '' : 'cat');
    searchPetStore.searchPets(LIMIT_SEARCH, 1);
  };

  const handleSelectDogs = () => {
    searchPetStore.handleCats(false);
    searchPetStore.handleDogs(!dogs);
    searchPetStore.handleExotic(false);
    searchPetStore.handleCategory(dogs ? '' : 'dog');
    searchPetStore.searchPets(LIMIT_SEARCH, 1);
  };

  const handleSelectExotics = () => {
    searchPetStore.handleCats(false);
    searchPetStore.handleDogs(false);
    searchPetStore.handleExotic(!exotics);
    searchPetStore.handleCategory(exotics ? '' : 'exotic');
    searchPetStore.searchPets(LIMIT_SEARCH, 1);
  };

  const handleSelectFemale = () => {
    searchPetStore.handleFemale(!female);
    searchPetStore.handleMale(false);
    searchPetStore.handleGender(female ? '' : 'female');
    searchPetStore.searchPets(LIMIT_SEARCH, 1);
  };

  const handleSelectMale = () => {
    searchPetStore.handleMale(!male);
    searchPetStore.handleFemale(false);
    searchPetStore.handleGender(male ? '' : 'male');
    searchPetStore.searchPets(LIMIT_SEARCH, 1);
  };

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
