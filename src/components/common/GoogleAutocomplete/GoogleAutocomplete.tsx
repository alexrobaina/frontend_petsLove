import { FC, useState, ReactChild, useCallback, useEffect } from 'react';
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
  handleChangeAddress?: Function;
  handleChangeTextAddress?: Function;
  handleChangeAddressComponents?: Function;
}

const GoogleAutocomplete: FC<Props> = ({
  name = '',
  label = '',
  icon = null,
  inputRef = null,
  placeholder = '',
  handleSearch = null,
  handleChangeAddress = null,
  handleChangeTextAddress = null,
  handleChangeAddressComponents = null,
}) => {
  const { t } = useTranslation();
  const [address, setAddress] = useState('');
  // eslint-disable-next-line no-shadow
  const handleChange = useCallback((address) => {
    if (address === '') {
      if (handleChangeTextAddress) {
        handleChangeAddressComponents([]);
      }
    }
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
              <div className={styles.containerInput}>
                {label && <div>{label}</div>}
                <input
                  name={name}
                  ref={inputRef}
                  className={styles.input}
                  {...getInputProps({
                    placeholder,
                  })}
                />
                {icon && <div className={styles.icon}>{icon}</div>}
              </div>
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
  apiKey: 'AIzaSyCSu_v2WqQJjf_Km_srRzxqoN-ELXwlEY0',
  // @ts-ignore
})(GoogleAutocomplete);
