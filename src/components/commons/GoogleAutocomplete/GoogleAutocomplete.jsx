import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { GoogleApiWrapper } from 'google-maps-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import styles from './googleAutocomplete.scss'
import ViewValue from '../ViewValue'

const GoogleAutocomplete = ({
  handleChangeTextAddress,
  handleChangeAddress,
  placeholder,
  value,
  name,
  isEdit,
}) => {
  const [address, setAddress] = useState('')

  // eslint-disable-next-line no-shadow
  const handleChange = useCallback(address => {
    setAddress(address)
  }, [])

  // eslint-disable-next-line no-shadow
  const handleSelect = useCallback(address => {
    if (handleChangeTextAddress) {
      handleChangeTextAddress(address)
    }
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => handleChangeAddress(latLng))
      .catch(error => console.error('Error', error))
  }, [])

  return (
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <div>
            {isEdit === false ? (
              <ViewValue placeholder={placeholder} value={value} />
            ) : (
              <input
                name={name}
                className={styles.input}
                {...getInputProps({
                  placeholder,
                })}
              />
            )}
            <div className={styles.dropdown}>
              {loading && <div className={styles.text}>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: 'rgba(146, 154, 230, 0.30)',
                      cursor: 'pointer',
                      padding: '10px',
                    }
                  : { backgroundColor: 'rgb(255, 255, 255)', cursor: 'pointer', padding: '10px' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    </PlacesAutocomplete>
  )
}

GoogleAutocomplete.propTypes = {
  handleChangeAddress: PropTypes.func,
  handleChangeTextAddress: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  isEdit: PropTypes.bool,
}

GoogleAutocomplete.defaultProps = {
  handleChangeAddress: null,
  handleChangeTextAddress: null,
  placeholder: '',
  label: '',
  value: '',
  isEdit: false,
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCG4to6zaiKQpUhXTPRnYWXcoJ8RxU5nps',
})(GoogleAutocomplete)
