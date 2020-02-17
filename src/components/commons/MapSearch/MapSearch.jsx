import React, { useCallback, useEffect, useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import SearchMapStore from 'stores/SearchMapStore'
import { useLocalStore } from 'mobx-react'
import iconMarket from './call.svg'
import styles from './placeMarkMap.scss'

const MapSearch = () => {
  const searchMapStore = useLocalStore(() => new SearchMapStore())

  const provider = new OpenStreetMapProvider()
  const [location, setLocation] = useState({
    lat: -34.61315,
    lng: -58.37723,
  })

  const handleMap = useCallback(() => {
    if (searchMapStore.search !== '') {
      provider.search({ query: searchMapStore.search }).then(result => {
        if (result[0] !== undefined) {
          setLocation({
            lat: result[0].bounds[0][0],
            lng: result[0].bounds[0][1],
          })
        }
      })
    }
    if (searchMapStore.search === '') {
      setLocation({
        lat: -34.61315,
        lng: -58.37723,
      })
    }
  }, [])

  const handleSearch = useCallback(e => {
    searchMapStore.setSearch(e.target.value)
    handleMap()
  })

  const icon = L.icon({
    iconUrl: iconMarket,
    iconSize: [35, 35], // size of the icon
    popupAnchor: [0, -18], // point from which the popup should open relative to the iconAnchor
  })

  useEffect(() => {}, [])

  return (
    <div>
      {/*<input onChange={handleSearch} type="text" placeholder="map" />*/}
      <Map className={styles.map} center={location} zoom="15">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </div>
  )
}

export default MapSearch
