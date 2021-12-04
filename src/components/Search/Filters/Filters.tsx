import { FC, useEffect } from 'react';
import { GiCat } from 'react-icons/gi';
import { FaDog } from 'react-icons/fa';
import { GoSquirrel } from 'react-icons/go';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { observer } from 'mobx-react-lite';
import { LIMIT_SEARCH } from 'services/config';
import SearchPetStore from 'stores/SearchPetStore';
import ButtonFilter from '../ButtonFilter';
import styles from './filters.module.scss';

interface Props {
  searchPetStore: SearchPetStore;
}

const Filters: FC<Props> = ({ searchPetStore }) => {
  const { male, dogs, cats, female, exotics, gender, category } = searchPetStore;

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

  useEffect(() => {
    if (category.value === 'cat') searchPetStore.handleCats(true);
    if (category.value === 'dog') searchPetStore.handleDogs(true);
    if (category.value === 'exotic') searchPetStore.handleExotic(true);
    if (gender.value === 'female') searchPetStore.handleFemale(true);
    if (gender.value === 'male') searchPetStore.handleMale(true);
  });

  return (
    <div className={styles.containerFilters}>
      <ButtonFilter
        isSelected={cats}
        icon={<GiCat size={26} />}
        handleSelected={handleSelectCats}
      />
      <ButtonFilter
        isSelected={dogs}
        icon={<FaDog size={26} />}
        handleSelected={handleSelectDogs}
      />
      <ButtonFilter
        isSelected={exotics}
        icon={<GoSquirrel size={26} />}
        handleSelected={handleSelectExotics}
      />
      <ButtonFilter
        isSelected={female}
        icon={<IoMdFemale size={26} />}
        handleSelected={handleSelectFemale}
      />
      <ButtonFilter
        isSelected={male}
        icon={<IoMdMale size={26} />}
        handleSelected={handleSelectMale}
      />
    </div>
  );
};

export default observer(Filters);
