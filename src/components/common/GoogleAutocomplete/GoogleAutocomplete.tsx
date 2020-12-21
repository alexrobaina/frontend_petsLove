import React, { FC, useRef, useState, ReactChild, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import styles from './googleAutocomplete.module.scss';

interface Props {
  name?: string;
  label?: string;
  inputRef?: any;
  icon?: ReactChild;
  placeholder?: string;
  handleSearch?: Function;
  inputStoreError?: boolean;
  handleChangeAddress?: CallableFunction;
  handleChangeTextAddress?: CallableFunction;
  handleChangeAddressComponents?: CallableFunction;
}

const GoogleAutocomplete: FC<Props> = ({
  name = '',
  label = '',
  inputRef = null,
  placeholder = '',
  handleSearch = null,
  handleChangeAddress = null,
  handleChangeTextAddress = null,
  handleChangeAddressComponents = null,
}) => {
  const googleInputRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const [address, setAddress] = useState('');
  // eslint-disable-next-line no-shadow
  const handleChange = useCallback((address) => {
    setAddress(address);
  }, []);

  const configAddress = async (addressSelected) => {
    setAddress(addressSelected);

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
              {label && <div>{label}</div>}
              <input
                ref={inputRef}
                name={name}
                className={styles.input}
                {...getInputProps({
                  placeholder,
                })}
              />
              <div className={styles.dropdown}>
                {loading && <div className={styles.text}>{t('common:loading')}</div>}
                {suggestions.map((suggestion, i) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: 'rgba(146, 154, 230, 0.30)',
                        cursor: 'pointer',
                        padding: '10px',
                      }
                    : {
                        backgroundColor: 'rgb(255, 255, 255)',
                        cursor: 'pointer',
                        padding: '10px',
                      };
                  return (
                    <div
                      key={i}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </>
          );
        }}
      </PlacesAutocomplete>
      {/* {inputStoreError && (
          <div className={styles.errorMessage}>{inputStoreError.errorMessage}</div>
        )} */}
    </>
  );
};

export default GoogleApiWrapper({
  // apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  apiKey: 'AIzaSyCG4to6zaiKQpUhXTPRnYWXcoJ8RxU5nps',
  // @ts-ignore
})(GoogleAutocomplete);
