import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styles from './googleMapsLocation.module.scss';

const POSITION_DEFAULT = {
  lat: -34.603722,
  lng: -58.381592,
};

interface Props {
  position?: {
    lat: number;
    lng: number;
  };
}

const GoogleMapsLocation: FC<Props> = observer(({ position }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          zoom={10}
          center={position || POSITION_DEFAULT}
          mapContainerClassName={styles.imageMap}
        >
          <Marker position={POSITION_DEFAULT} />
        </GoogleMap>
      )}
    </>
  );
});

export default GoogleMapsLocation;
