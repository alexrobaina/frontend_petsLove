/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleApiWrapper } from 'google-maps-react'
import { FC, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

import { IconMap } from '../../assets/icons'

interface latLng {
  lat: number
  lng: number
}

interface CustomPlaceResult {
  latLng: latLng
  results: {
    formatted_address: string
    address_components: {
      long_name: string
      short_name: string
      types: string[]
    }[]
  }[]
}

interface Props {
  label?: string
  placeholder?: string
  showAddress?: boolean
  setLocation: (result: CustomPlaceResult) => void
}

export type GoogleAPI = typeof google

export interface IProvidedProps {
  google?: GoogleAPI
  loaded?: boolean
}

interface ExtendedProps extends Props, IProvidedProps {}

const GoogleAutocomplete: FC<ExtendedProps> = ({
  label,
  setLocation,
  showAddress,
  placeholder = 'Search by location',
}) => {
  const [address, setAddress] = useState('')

  const handleSelect = async (value: string) => {
    try {
      const results: google.maps.GeocoderResult[] =
        await geocodeByAddress(value)

      const latLng = await getLatLng(results[0])

      setLocation({ results, latLng })
      setAddress(value)
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          {label && (
            <label className="block text-sm font-medium leading-6 text-primary-950">
              {label}
            </label>
          )}
          <input
            className={`block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-400 outline-none
                   placeholder:text-neutral-400 focus:ring-primary-300 sm:text-sm sm:leading-6 pl-4`}
            {...getInputProps({ placeholder })}
          />
          {showAddress && address && (
            <div className="flex gap-2 mt-2">
              <div style={{ width: 22 }}>
                <IconMap />
              </div>
              <p className="text-primary-900">{address}</p>
            </div>
          )}
          <div className="absolute flex flex-col w-full rounded-md shadow-lg bg-primary-50 mt-2">
            {loading && <div className="w-full h-14 p-4">Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const style = suggestion.active
                ? { backgroundColor: '#ace3d3' }
                : { backgroundColor: '#ffffff' }
              return (
                <div
                  className="cursor-pointer text-primary-900 p-4 rounded-md"
                  {...getSuggestionItemProps(suggestion, { style })}
                  key={index}
                >
                  {suggestion.description}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  language: 'es',
})(GoogleAutocomplete as any) as React.ComponentType<ExtendedProps>
