import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseButton } from '../../components/common/BaseButton'
import { BaseButtonGroups } from '../../components/common/BaseButtonGroups'
import GoogleAutocomplete from '../../components/common/GoogleAutocomplete'
import { Header } from '../../components/common/Header'
import { Pagination } from '../../components/common/Pagination'
import { PetList } from '../../components/common/PetList/Index'
import { IAddressComponent } from '../../constants/interfaces'
import { GENDER, TYPE_OF_PETS } from '../../constants/serachPets'
import { useGetPets } from '../../hooks/useGetPets'

export const AdoptionPetPage: FC = () => {
  const { t } = useTranslation(['common', 'searchPet'])
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [page, setPage] = useState(1)
  const [gender, setGender] = useState('')
  const [category, setCategory] = useState('')
  const { data, isLoading, refetch } = useGetPets({
    page,
    gender,
    category,
    adopted: false,
    city: city,
    country: country,
  })

  const resetLocation = () => {
    setCity('')
    setCountry('')
    refetch()
  }

  const handeResetFilters = () => {
    setGender('')
    setPage(1)
    setCategory('')
    setCity('')
    setCountry('')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeLocation = (result: any) => {
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

  return (
    <div>
      <header className="flex justify-between flex-col md:flex-row gap-6">
        <Header title={t('searchPet:searchPetForAdoption')} />
        <div className="flex items-center gap-4">
          <BaseButton
            style="secondary"
            text={t('common:resetFilters')}
            onClick={handeResetFilters}
          />
          <BaseButtonGroups
            group={TYPE_OF_PETS}
            buttonSelected={category}
            handleSelectButtonGroup={setCategory}
          />
          <BaseButtonGroups
            group={GENDER}
            buttonSelected={gender}
            handleSelectButtonGroup={setGender}
          />
        </div>
      </header>
      <div className="mt-10">
        <GoogleAutocomplete
          label={t('common:location')}
          resetLocation={resetLocation}
          setLocation={handleChangeLocation}
          placeholder={t('common:searchByLocation')}
        />
      </div>
      <PetList pets={data?.pets} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage} take={10} total={data?.total} />
    </div>
  )
}
