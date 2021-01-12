import React, { FC, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import c from 'classnames';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import styles from './googleMapsLocation.module.scss';

const POSITION_DEFAULT = {
  lat: -34.603722,
  lng: -58.381592,
};

interface GoogleMapsLication {
  google?: ReactNode;
  location?: {
    lat: Number;
    lng: Number;
  };
  isProfilePet?: Boolean;
  users: Object;
  GoogleMapsLocation: ReactNode;
}

const GoogleMapsLocation: FC<GoogleMapsLication> = observer(
  ({ google, location, isProfilePet, users }) => {
    const [isImageNotFound, setIsImageNotFound] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const { t } = useTranslation('googleMapCard');
    const [activeMarker, setActiveMarker] = useState({});
    const [activeMarkerUser, setActiveMarkerUser] = useState({});
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [showingInfoWindowUser, setShowingInfoWindowUser] = useState(false);

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    return (
      <div className={c(isProfilePet ? styles.containerMapPets : styles.containerMap)}>
        <Map
          // zoom={15}
          google={google}
          // className={styles.map}
          initialCenter={location.lat ? location : POSITION_DEFAULT}
          center={{
            lat: location.lat,
            lng: location.lng,
          }}
        >
          {/* <Marker position={location} /> */}
          {/* {users &&
            users.map((user) => {
              return (
                <Marker
                  key={user._id}
                  onError={onError}
                  name={user.name}
                  email={user.email}
                  onClick={onMarkerClick}
                  position={user.location}
                  isImageNotFound={isImageNotFound}
                  image={user.image && user.image.filenames[0]}
                />
              );
            })} */}
          {/* <InfoWindow marker={activeMarker} visible={showingInfoWindow}></InfoWindow> */}
        </Map>
      </div>
    );
  },
);

GoogleMapsLocation.defaultProps = {
  location: {
    lat: -34.603722,
    lng: -58.381592,
  },
  users: null,
};

export default GoogleApiWrapper(() => ({
  apiKey: process.env.REACT_APP_KEY_GOOGLE_MAP,
  // @ts-ignore
}))(GoogleMapsLocation);
