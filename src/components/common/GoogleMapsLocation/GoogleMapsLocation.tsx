import React, {
  FC,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  ReactChildren,
} from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import c from 'classnames';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import styles from './googleMapsLocation.module.scss';

const POSITION_DEFAULT = {
  lat: -34.603722,
  lng: -58.381592,
};

interface IGoogleMapsLocation {
  location?: any;
  google: ReactNode;
  isProfilePet?: Boolean;
}

const GoogleMapsLocation: FC<IGoogleMapsLocation> = observer(
  ({ google, location = POSITION_DEFAULT, isProfilePet = false }) => {
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
          initialCenter={location}
          center={location}
        >
          <Marker />
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

export default GoogleApiWrapper(() => ({
  apiKey: process.env.REACT_APP_KEY_GOOGLE_MAP,
  // @ts-ignore
}))(GoogleMapsLocation);
