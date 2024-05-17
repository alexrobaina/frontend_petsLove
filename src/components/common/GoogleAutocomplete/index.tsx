/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleApiWrapper } from 'google-maps-react'
import { FC, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

import { IconMap } from '../../../assets/icons'

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
  loaded?: boolean
  google?: GoogleAPI
  resetLocation?: () => void
  error?: string | undefined | boolean
}

interface ExtendedProps extends Props, IProvidedProps {}

const GoogleAutocomplete: FC<ExtendedProps> = ({
  label,
  error,
  setLocation,
  showAddress,
  resetLocation,
  placeholder = 'Search by location',
}) => {
  const [address, setAddress] = useState('')

  const handleChange = (value: string) => {
    setAddress(value)
    if (value === '') {
      resetLocation && resetLocation()
    }
  }

  const handleSelect = async (value: string) => {
    try {
      const results: google.maps.GeocoderResult[] =
        await geocodeByAddress(value)

      const latLng = await getLatLng(results[0])

      setLocation({ results, latLng })
      handleChange(value)
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
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
            className={`${
              error && 'ring-red-500'
            }  block w-full rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-400 outline-none
                   placeholder:text-neutral-500 focus:ring-primary-300 sm:text-sm sm:leading-6 pl-4`}
            {...getInputProps({ placeholder })}
          />
          {error && (
            <div className="pointer-appointments-none absolute right-0 top-8 flex items-center pr-3">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-red-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          )}
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {showAddress && address && (
            <div className="flex gap-2 mt-2">
              <div style={{ width: 22 }}>
                <IconMap />
              </div>
              <p className="text-primary-900">{address}</p>
            </div>
          )}
          <div className="absolute flex flex-col w-full rounded-md shadow-lg bg-primary-50 mt-2 z-[50]">
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
  apiKey: 'AIzaSyCqFbjokkkUeyPBp2Q8521jviFfzoJmnnE',
  language: 'es',
})(GoogleAutocomplete as any) as React.ComponentType<ExtendedProps>
