import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BaseButtonGroups } from '../../components/common/BaseButtonGroups'
import GoogleAutocomplete from '../../components/common/GoogleAutocomplete'
import { Header } from '../../components/common/Header'
import { ROLES, TYPE_OF_COMMUNITY } from '../../constants/community'
import { IAddressComponent } from '../../constants/interfaces'
import useUserList from '../../hooks/user/useUserList'

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
  const { t } = useTranslation(["community", "common"])
  const navigation = useNavigate()
  const [role, setRole] = useState(ROLES.SHELTER)
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [take] = useState(10)
  const [page, setPage] = useState(1)

  const { data, error, isLoading, refetch } = useUserList({
    role,
    country,
    city,
    page,
  })

  const goToUserProfile = (id: string) => {
    navigation(`/user/${id}`)
  }

  const resetLocation = () => {
    setCountry('')
    setCity('')
    refetch()
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
    setPage(1)
  }, [role, country, city])

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      <header className="flex md:justify-between md:flex-row flex-col items-start">
        <Header title={t('common:community')} />
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
            <h1 className="text-xl font-semibold leading-6 text-primary-950">
              {t('community:findProfessionals')}
            </h1>
            <p className="mt-2 text-sm text-primary-500">
              {t('community:findProfessionalDescription')}
            </p>
          </div>
        </div>
        <div className="mt-10">
          <GoogleAutocomplete
            resetLocation={resetLocation}
            placeholder={t('community:searchLocation')}
            setLocation={handleChangeLocation}
            label={t('community:filterByLocation')}
          />
        </div>
        <CommunityTable
          data={data}
          page={page}
          take={take}
          setPage={setPage}
          isLoading={isLoading}
          goToUserProfile={goToUserProfile}
        />
      </div>
    </>
  )
}
