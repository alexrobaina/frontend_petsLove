import { FC, useState, ReactChild, useCallback, useEffect } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import BaseLabel from '../BaseLabel';
import { useGetVariableColor } from 'hooks/useGetVariableColor';
import BaseErrorMessage from '../BaseErrorMessage';

import styles from './googleAutocomplete.module.scss';

interface Props {
  name?: string;
  label?: string;
  error?: string;
  inputRef?: any;
  icon?: ReactChild;
  placeholder?: string;
  marginTop?: string;
  handleSearch?: Function;
  inputStoreError?: boolean;
  handleChangeAddress?: Function;
  handleChangeTextAddress?: Function;
  handleChangeAddressComponents?: Function;
}

const GoogleAutocomplete: FC<Props> = ({
  name = '',
  label = '',
  icon = null,
  error,
  marginTop = '10px',
  inputRef = null,
  placeholder = '',
  handleSearch = null,
  handleChangeAddress = null,
  handleChangeTextAddress = null,
  handleChangeAddressComponents = null,
}) => {
  const backgroundColorAddresList = useGetVariableColor(
    '--background-color-address-list',
  );
  const [address, setAddress] = useState('');
  // eslint-disable-next-line no-shadow
  const handleChange = useCallback((address: string) => {
    if (address === '') {
      if (handleChangeTextAddress) {
        handleChangeAddressComponents && handleChangeAddressComponents([]);
      }
    }

    setAddress(address);
  }, []);

  const configAddress = async (addressSelected: string) => {
    setAddress(addressSelected);

    if (handleChangeTextAddress) {
      handleChangeTextAddress(addressSelected);
    }

    if (handleSearch) {
      handleSearch();
    }
    if (handleChangeTextAddress) {
      handleChangeTextAddress(addressSelected);
    }
    const results = await geocodeByAddress(addressSelected);
    const latLng = await getLatLng(results[0]);

    if (handleChangeAddress) {
      handleChangeAddress(latLng);
    }

    if (handleChangeAddressComponents) {
      handleChangeAddressComponents(results[0]);

      if (handleSearch) {
        handleSearch();
      }
    }
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={configAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <>
              <div style={{ marginTop }} className={styles.containerInput}>
                {label && <BaseLabel bold text={label} />}
                <input
                  name={name}
                  ref={inputRef}
                  className={styles.input}
                  {...getInputProps({
                    placeholder,
                  })}
                />
                {icon && <div className={styles.icon}>{icon}</div>}
                {error && <BaseErrorMessage text={error} />}
              </div>
              <div className={styles.dropdown}>
                {loading && <div className={styles.text}>Cargando</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style = suggestion.active
                    ? {
                        backgroundColor: 'rgba(146, 154, 230, 0.30)',
                        cursor: 'pointer',
                        padding: '10px',
                      }
                    : {
                        backgroundColor: backgroundColorAddresList,
                        cursor: 'pointer',
                        padding: '10px',
                      };
                  return (
                    <div
                      key={suggestion.description}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span className={styles.descriptionAddress}>
                        {suggestion.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          );
        }}
      </PlacesAutocomplete>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || '',
  language: 'es',
  // @ts-ignore
})(GoogleAutocomplete);
