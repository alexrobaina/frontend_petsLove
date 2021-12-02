import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from './googleMapsLocation.module.scss';

const POSITION_DEFAULT = {
  lat: -34.603722,
  lng: -58.381592,
};

const GoogleMapsLocation: FC = observer(() => {
  const onLoad = (marker: any) => {
    console.log('marker', marker);
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyCSu_v2WqQJjf_Km_srRzxqoN-ELXwlEY0">
      <GoogleMap
        zoom={10}
        center={POSITION_DEFAULT}
        mapContainerClassName={styles.imageMap}
      >
        <Marker onLoad={onLoad} position={POSITION_DEFAULT} />
      </GoogleMap>
    </LoadScript>
  );
});

export default GoogleMapsLocation;
