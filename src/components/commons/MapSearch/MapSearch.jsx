import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import THEME_MAP, { THEME_COPY } from 'utils/configMap'
import Input from 'components/commons/Input'
import iconMarket from './call.svg'
import styles from './placeMarkMap.scss'

const MapSearch = ({ handleChangeLocation, searchMapStore }) => {
  const [locationDefault, setLocationDefault] = useState()
  const [location, setLocation] = useState(false)

  const provider = new OpenStreetMapProvider()

  const handleMap = async search => {
    if (search !== '') {
      await provider
        .search({ query: searchMapStore.search })
        .then(result => {
          if (result[0].bounds !== undefined) {
            setLocation({
              lat: result[0].bounds[0][0],
              lng: result[0].bounds[0][1],
            })
          }
        })
        .catch(error => {
          console.error(error.message)
        })
    }
    handleChangeLocation(location)
  }

  const handleSearch = useCallback(e => {
    searchMapStore.setSearch(e.target.value)
    handleMap(searchMapStore.search)
  })

  const icon = L.icon({
    iconUrl: iconMarket,
    iconSize: [35, 35], // size of the icon
    popupAnchor: [0, -18], // point from which the popup should open relative to the iconAnchor
  })

  useEffect(() => {
    setLocationDefault({
      lat: -34.603722,
      lng: -58.381592,
    })
  }, [])

  return (
    <div>
      <Input handleChange={handleSearch} type="text" placeholder="Location Pet" />
      <Map className={styles.map} center={location || locationDefault} zoom="15">
        <TileLayer attribution={THEME_COPY} url={THEME_MAP} />
        <Marker position={location || locationDefault} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </div>
  )
}

export default observer(MapSearch)
