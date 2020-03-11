import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import THEME_MAP, { THEME_COPY } from 'utils/configMap'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import iconMarket from './call.svg'
import styles from './placeMarkMap.scss'

const PlaceMarkMap = ({ mapPosition, contactMessage, defaultPosition }) => {
  const icon = L.icon({
    iconUrl: iconMarket,
    iconSize: [35, 35], // size of the icon
    popupAnchor: [0, -18], // point from which the popup should open relative to the iconAnchor
  })

  return (
    <div>
      <Map
        className={styles.map}
        center={mapPosition === [] ? mapPosition[0] : defaultPosition[0]}
        zoom="15"
      >
        <TileLayer attribution={THEME_COPY} url={THEME_MAP} />
        <Marker position={defaultPosition[0]} icon={icon}>
          <Popup>{contactMessage}</Popup>
        </Marker>
      </Map>
    </div>
  )
}

PlaceMarkMap.propTypes = {
  contactMessage: PropTypes.string.isRequired,
  mapPosition: PropTypes.oneOfType([PropTypes.array]).isRequired,
}

export default PlaceMarkMap
