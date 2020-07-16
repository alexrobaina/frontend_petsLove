import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import c from 'classnames'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import Loading from 'components/commons/Loading'
import { AWS_STORAGE } from 'services/config'
import CardGoogle from 'components/commons/CardGoogle'
import styles from './googleMapsLocation.scss'

const POSITION_DEFAULT = {
  lat: -34.603722,
  lng: -58.381592,
}

const GoogleMapsLocation = observer(
  ({ google, location, isProfilePet, users, isLocationPet, petLocation }) => {
    const [isImageNotFound, setIsImageNotFound] = useState(true)
    const [isLoading, setLoading] = useState(true)
    const { t } = useTranslation('googleMapCard')
    const [activeMarker, setActiveMarker] = useState({})
    const [activeMarkerUser, setActiveMarkerUser] = useState({})
    const [showingInfoWindow, setShowingInfoWindow] = useState(false)
    const [showingInfoWindowUser, setShowingInfoWindowUser] = useState(false)

    const onMarkerClick = (map, marker) => {
      setActiveMarker(marker)
      setShowingInfoWindow(!showingInfoWindow)
    }

    const onMarkerUserClick = (map, marker) => {
      setActiveMarkerUser(marker)
      setShowingInfoWindowUser(!showingInfoWindowUser)
    }

    const onError = useCallback(() => {
      setIsImageNotFound(false)
    }, [])

    setTimeout(() => {
      setLoading(false)
    }, 1500)

    if (isLoading) {
      return <Loading loadingRing />
    }

    return (
      <div className={c(isProfilePet ? styles.containerMapPets : styles.containerMap)}>
        <Map
          google={google}
          zoom={15}
          initialCenter={location.lat ? location : POSITION_DEFAULT}
          className={styles.map}
          center={{
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lng),
          }}
        >
          <Marker
            onClick={onMarkerUserClick}
            position={location.lat ? location : POSITION_DEFAULT}
          />
          {users &&
            users.map(user => {
              return (
                <Marker
                  isImageNotFound={isImageNotFound}
                  onError={onError}
                  key={user._id}
                  onClick={onMarkerClick}
                  position={user.location}
                  name={user.name}
                  email={user.email}
                  image={user.image.filenames[0]}
                  id={user._id}
                />
              )
            })}
          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <CardGoogle
              onError={activeMarker.onError}
              isImageNotFound={activeMarker.isImageNotFound}
              textButton={t('textButton')}
              image={activeMarker.image}
              name={activeMarker.name}
              email={activeMarker.email}
              id={activeMarker.id}
            />
          </InfoWindow>
          {!isLocationPet && (
            <InfoWindow marker={activeMarkerUser} visible={showingInfoWindowUser}>
              <div className={styles.userLocation}>{t('myLocation')}</div>
            </InfoWindow>
          )}
          {isLocationPet && (
            <InfoWindow marker={activeMarkerUser} visible={showingInfoWindowUser}>
              <div className={styles.userLocation}>{petLocation}</div>
            </InfoWindow>
          )}
        </Map>
      </div>
    )
  }
)

GoogleMapsLocation.propTypes = {
  location: PropTypes.oneOfType(PropTypes.object, PropTypes.string),
  users: PropTypes.arrayOf(PropTypes.number, PropTypes.string, PropTypes.bool),
  showAddress: PropTypes.bool,
  isProfilePet: PropTypes.bool,
  card: PropTypes.node,
  phone: PropTypes.string,
  title: PropTypes.string,
  email: PropTypes.string,
  isLocationPet: PropTypes.bool,
}

GoogleMapsLocation.defaultProps = {
  isLocationPet: false,
  users: null,
  card: null,
  phone: 'No have phone',
  email: 'Not have email',
  title: '',
  location: {
    lat: -34.603722,
    lng: -58.381592,
  },
  showAddress: false,
  isProfilePet: false,
}

export default GoogleApiWrapper(() => ({
  apiKey: process.env.REACT_APP_KEY_GOOGLE_MAP,
}))(GoogleMapsLocation)
