import { FC, useCallback, useRef } from 'react';
import { FcSearch } from 'react-icons/fc';
import GoogleAutocomplete from 'components/common/GoogleAutocomplete';
import { LIMIT_SEARCH } from 'services/config';
import SearchPetStore from 'stores/SearchPetStore';
import Filters from './Filters';

interface Props {
  searchPetStore: SearchPetStore;
}

const Search: FC<Props> = ({ searchPetStore }) => {
  const googleRef = useRef(null);

  const handleChangeAddressComponents = useCallback((address: any) => {
    searchPetStore.setAddressComponents(address);
  }, []);

  const handleSearch = useCallback(() => {
    searchPetStore.searchPets(LIMIT_SEARCH, 1);
  }, []);

  return (
    <div>
      <Filters searchPetStore={searchPetStore} />
      <GoogleAutocomplete
        // @ts-ignore
        inputRef={googleRef}
        name="google-autocomplete"
        handleSearch={handleSearch}
        icon={<FcSearch size={25} />}
        placeholder="Buenos Aires, Argentina..."
        handleChangeAddressComponents={handleChangeAddressComponents}
      />
    </div>
  );
};

export default Search;
