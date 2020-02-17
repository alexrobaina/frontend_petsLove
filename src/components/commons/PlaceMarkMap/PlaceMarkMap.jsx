import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import iconMarket from './call.svg'
import THEME_MAP, { THEME_COPY } from './config'
import styles from './placeMarkMap.scss'

const PlaceMarkMap = ({ addressPet, contactMessage }) => {
  const icon = L.icon({
    iconUrl: iconMarket,
    iconSize: [35, 35], // size of the icon
    popupAnchor: [0, -18], // point from which the popup should open relative to the iconAnchor
  })

  //provicional para dibujar el mapa. Este valor tiene que llegar por props
  const position = {
    lat: -34.61315,
    lng: -58.37723,
  }

  useEffect(() => {}, [])

  return (
    <div>
      <Map className={styles.map} center={position} zoom="15">
        <TileLayer
          attribution={THEME_COPY}
          url={THEME_MAP}
        />
        <Marker position={position} icon={icon}>
          <Popup>
            {contactMessage}
          </Popup>
        </Marker>
      </Map>
    </div>
  )
}

PlaceMarkMap.propTypes = {
  addressPet: PropTypes.string.isRequired,
  contactMessage: PropTypes.string.isRequired,
}

export default PlaceMarkMap
