import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import c from 'classnames'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import Loading from 'components/commons/Loading'
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
          zoom={15}
          google={google}
          className={styles.map}
          initialCenter={location.lat ? location : POSITION_DEFAULT}
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
                  id={user._id}
                  key={user._id}
                  onError={onError}
                  name={user.name}
                  email={user.email}
                  onClick={onMarkerClick}
                  position={user.location}
                  isImageNotFound={isImageNotFound}
                  image={user.image && user.image.filenames[0]}
                />
              )
            })}
          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <CardGoogle
              id={activeMarker.id}
              name={activeMarker.name}
              image={activeMarker.image}
              email={activeMarker.email}
              textButton={t('textButton')}
              onError={activeMarker.onError}
              isImageNotFound={activeMarker.isImageNotFound}
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
  card: PropTypes.node,
  phone: PropTypes.string,
  title: PropTypes.string,
  email: PropTypes.string,
  showAddress: PropTypes.bool,
  isProfilePet: PropTypes.bool,
  isLocationPet: PropTypes.bool,
  location: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  users: PropTypes.arrayOf([PropTypes.number, PropTypes.string, PropTypes.bool]),
}

GoogleMapsLocation.defaultProps = {
  card: null,
  title: '',
  location: {
    lat: -34.603722,
    lng: -58.381592,
  },
  users: null,
  showAddress: false,
  isProfilePet: false,
  isLocationPet: false,
  phone: 'No have phone',
  email: 'Not have email',
}

export default GoogleApiWrapper(() => ({
  apiKey: process.env.REACT_APP_KEY_GOOGLE_MAP,
}))(GoogleMapsLocation)
