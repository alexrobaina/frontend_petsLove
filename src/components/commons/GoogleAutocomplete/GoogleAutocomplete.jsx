import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { GoogleApiWrapper } from 'google-maps-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import styles from './googleAutocomplete.scss'

const GoogleAutocomplete = ({ handleChangeLocation }) => {
  const [address, setAddress] = useState('')

  // eslint-disable-next-line no-shadow
  const handleChange = useCallback(address => {
    setAddress(address)
  }, [])

  // eslint-disable-next-line no-shadow
  const handleSelect = useCallback(address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => handleChangeLocation(latLng))
      .catch(error => console.error('Error', error))
  }, [])

  return (
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <div>
            <input
              className={styles.input}
              {...getInputProps({
                placeholder: 'Search your address...',
              })}
            />
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
  handleChangeLocation: PropTypes.func.isRequired,
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCG4to6zaiKQpUhXTPRnYWXcoJ8RxU5nps',
})(GoogleAutocomplete)
