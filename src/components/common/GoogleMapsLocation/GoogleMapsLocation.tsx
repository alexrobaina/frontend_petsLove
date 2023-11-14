import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { FC } from 'react'

import styles from './googleMapsLocation.module.scss'

const POSITION_DEFAULT = {
  lat: -34.603722,
  lng: -58.381592,
}

interface Props {
  position?: {
    lat: number
    lng: number
  }
}

const GoogleMapsLocation: FC<Props> = ({ position }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
  })

  return (
    <>
      {isLoaded && (
        <GoogleMap
          zoom={14}
          center={position || POSITION_DEFAULT}
          mapContainerClassName={styles.imageMap}
        >
          <Marker position={position || POSITION_DEFAULT} />
        </GoogleMap>
      )}
    </>
  )
}

export default GoogleMapsLocation
