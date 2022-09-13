import { FC, useCallback, useEffect, useRef } from "react";
import { FcSearch } from "react-icons/fc";
import GoogleAutocomplete from "components/common/GoogleAutocomplete";
import Filters from "./Filters";

import styles from "./search.module.scss";

interface Props {
  sex: string;
  address: string;
  category: string;
  setSex: (sex: string) => void;
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
  setCategory: (category: string) => void;
  setTextAddress: (textAddress: string) => void;
}

const Search: FC<Props> = ({
  sex,
  setSex,
  setCity,
  address,
  category,
  setCountry,
  setCategory,
  setTextAddress,
}) => {
  const googleRef = useRef(null);

  const handleChangeAddressComponents = (address: any) => {
    if (address?.address_components) {
      address.address_components.forEach(
        (components: { types: [any]; long_name: string }) => {
          components.types.forEach((type: string) => {
            if (type === "country") {
              setCountry(components.long_name);
            }
            if (type === "administrative_area_level_1") {
              setCity(components.long_name);
            }
          });
        }
      );
    } else {
      setCountry("");
      setCity("");
    }
  };

  const handleSelectSex = (sex: string) => {
    setSex(sex);
  };

  const handleSelectCategory = (category: string) => {
    setCategory(category);
  };

  const handleChangeTextAddress = useCallback((textAddress: string) => {
    setTextAddress(textAddress);
  }, []);

  useEffect(() => {
    if (address === "") {
      setTextAddress("");
    }
  }, [address]);

  return (
    <div className={styles.containerSearch}>
      <Filters
        sex={sex}
        category={category}
        handleSelectSex={handleSelectSex}
        handleSelectCategory={handleSelectCategory}
      />
      <GoogleAutocomplete
        // @ts-ignore
        inputRef={googleRef}
        name="google-autocomplete"
        icon={<FcSearch size={25} />}
        placeholder="Busca mascotas cerca de ti"
        handleChangeTextAddress={handleChangeTextAddress}
        handleChangeAddressComponents={handleChangeAddressComponents}
      />
      <div className={styles.address}>{address}</div>
    </div>
  );
};

export default Search;
