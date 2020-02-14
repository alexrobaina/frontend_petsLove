import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import styles from './mapSearch.scss'

const MapSearch = props => {
  const position = {
    lat: -34.6131516,
    lng: -58.3772316,
  }

  return (
    <Map className={styles.map} center={position} zoom="13">
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.svg"
        maxZoom="20"
        attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  )
}

Map.propTypes = {}

export default MapSearch
