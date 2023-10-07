import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BaseButtonGroups } from '../../components/BaseButtonGroups'
import GoogleAutocomplete from '../../components/GoogleAutocomplete'
import { Header } from '../../components/Header'
import { ROLES, TYPE_OF_COMMUNITY } from '../../constants/community'
import { IAddressComponent } from '../../constants/interfaces'
import useUserList from '../../hooks/useUserList'

import { CommunityTable } from './components/CommunityTable'

interface IResults {
  results: {
    formatted_address: string
    address_components: {
      long_name: string
      short_name: string
      types: string[]
    }[]
  }[]
  latLng: {
    lat: number
    lng: number
  }
}

export const CommunityPage: FC = () => {
  const navigation = useNavigate()
  const [role, setRole] = useState(ROLES.SHELTER)
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [skip, setSkip] = useState(1)
  const [take] = useState(10)
  const { data, error, isLoading } = useUserList({
    role,
    country,
    city,
    skip,
    take,
  })

  const goToUserProfile = (id: string) => {
    navigation(`/user/${id}`)
  }

  const handleChangeLocation = (result: IResults) => {
    const addressComponents: IAddressComponent[] =
      result.results[0].address_components

    addressComponents.forEach((component: IAddressComponent) => {
      if (component.types.includes('locality')) {
        setCity(component.long_name)
      }
      if (component.types.includes('country')) {
        setCountry(component.long_name)
      }
    })
  }

  useEffect(() => {
    setSkip(1)
  }, [role, country, city])

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      <header className="flex md:justify-between md:flex-row flex-col items-start">
        <Header title="Community" />
        <div className="flex items-center gap-4 mt-10 md:mt-0 justify-center">
          <BaseButtonGroups
            buttonSelected={role}
            group={TYPE_OF_COMMUNITY}
            handleSelectButtonGroup={setRole}
          />
        </div>
      </header>
      <div className="shadow-lg rounded-md mt-16 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Find a professional
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Connect with trusted professionals—from vets to volunteers and
              shelters
            </p>
          </div>
        </div>
        <div className="mt-10">
          <GoogleAutocomplete
            label="Filter by location"
            setLocation={handleChangeLocation}
          />
        </div>
        <CommunityTable
          data={data}
          skip={skip}
          take={take}
          setSkip={setSkip}
          isLoading={isLoading}
          goToUserProfile={goToUserProfile}
        />
      </div>
    </>
  )
}
