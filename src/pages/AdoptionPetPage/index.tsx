import { FC, useState } from 'react'

import { BaseButtonGroups } from '../../components/BaseButtonGroups'
import GoogleAutocomplete from '../../components/GoogleAutocomplete'
import { Header } from '../../components/Header'
import { PetList } from '../../components/PetList/Index'
import { CustomPlaceResult } from '../../constants/interfaces'
import { GENDER, TYPE_OF_PETS } from '../../constants/serachPets'
import { useGetPets } from '../../hooks/useGetPets'

export const AdoptionPetPage: FC = () => {
  const [filters, setFilters] = useState({
    city: '',
    gender: '',
    country: '',
    address: '',
    typePet: '',
  })
  const { data, isLoading } = useGetPets()
  const [typePet, setTypePet] = useState('')
  const [gender, setGender] = useState('')

  const handleChangeLocation = (result: CustomPlaceResult) => {
    setFilters({
      ...filters,
      address: result.results[0].formatted_address,
      country: result.results[0].address_components[3].long_name,
      city: result.results[0].address_components[1].long_name,
    })
  }

  return (
    <div>
      <header className="flex justify-between flex-col md:flex-row gap-6">
        <Header title="Search pet for Adoption" />
        <div className="flex items-center gap-4">
          <BaseButtonGroups
            group={TYPE_OF_PETS}
            buttonSelected={typePet}
            handleSelectButtonGroup={setTypePet}
          />
          <BaseButtonGroups
            group={GENDER}
            buttonSelected={gender}
            handleSelectButtonGroup={setGender}
          />
        </div>
      </header>
      <div className="mt-10">
        <GoogleAutocomplete setLocation={handleChangeLocation} />
      </div>
      <PetList pets={data?.pets} isLoading={isLoading} />
    </div>
  )
}
