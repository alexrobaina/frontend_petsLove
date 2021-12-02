import { FC, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FcSearch } from 'react-icons/fc';
import GoogleAutocomplete from 'components/common/GoogleAutocomplete';
import { LIMIT_SEARCH } from 'services/config';
import SearchPetStore from 'stores/SearchPetStore';
import Filters from './Filters';

interface Props {
  searchPetStore: SearchPetStore;
}

const Search: FC<Props> = ({ searchPetStore }) => {
  const { t } = useTranslation();
  const googleRef = useRef(null);

  const handleChangeAddressComponents = useCallback((address: any) => {
    searchPetStore.setAddressComponents(address);
  }, []);

  const handleSearch = useCallback(() => {
    searchPetStore.searchPets(LIMIT_SEARCH, 1);
  }, []);

  const handleChangeTextAddress = useCallback((textAddress) => {
    searchPetStore.handleTextAddress(textAddress);
  }, []);

  useEffect(() => {
    const { city, gender, category, country } = searchPetStore;

    if (city.value || gender.value || category.value || country.value) {
      searchPetStore.searchPets(LIMIT_SEARCH, 1);
    }
  }, []);

  return (
    <>
      <Filters searchPetStore={searchPetStore} />
      <GoogleAutocomplete
        // @ts-ignore
        inputRef={googleRef}
        name="google-autocomplete"
        handleSearch={handleSearch}
        icon={<FcSearch size={25} />}
        placeholder={t('SearchYourArea')}
        handleChangeTextAddress={handleChangeTextAddress}
        handleChangeAddressComponents={handleChangeAddressComponents}
      />
    </>
  );
};

export default Search;
