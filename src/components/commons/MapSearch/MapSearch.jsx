import React, { useCallback, useEffect, useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import SearchMapStore from 'stores/SearchMapStore'
import { observer, useLocalStore } from 'mobx-react'
import iconMarket from './call.svg'
import styles from './placeMarkMap.scss'

const MapSearch = () => {
  const [locationDefault, setLocation] = useState()
  const searchMapStore = useLocalStore(() => new SearchMapStore())

  const provider = new OpenStreetMapProvider()

  const handleMap = useCallback(search => {
    if (search !== '') {
      provider.search({ query: searchMapStore.search }).then(result => {
        searchMapStore.setLat(result[0].bounds[0][0])
        searchMapStore.setLng(result[0].bounds[0][1])
      })
      console.log(searchMapStore.lat)
    }
    console.log(searchMapStore.lat)
  }, [])

  const handleSearch = useCallback(e => {
    searchMapStore.setSearch(e.target.value)
    handleMap(searchMapStore.search)
  })

  const icon = L.icon({
    iconUrl: iconMarket,
    iconSize: [35, 35], // size of the icon
    popupAnchor: [0, -18], // point from which the popup should open relative to the iconAnchor
  })

  return (
    <div>
      <input onChange={handleSearch} type="text" placeholder="map" />
      <Map
        className={styles.map}
        center={searchMapStore.location ? searchMapStore.location : locationDefault}
        zoom="15"
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={searchMapStore.location} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </div>
  )
}

export default observer(MapSearch)
