import { FC, useState } from 'react'

import { BaseButton } from '../../components/common/BaseButton'
import { BaseButtonGroups } from '../../components/common/BaseButtonGroups'
import GoogleAutocomplete from '../../components/common/GoogleAutocomplete'
import { Header } from '../../components/common/Header'
import { Pagination } from '../../components/common/Pagination'
import { PetList } from '../../components/common/PetList/Index'
import { GENDER, TYPE_OF_PETS } from '../../constants/serachPets'
import { useGetPets } from '../../hooks/useGetPets'

export const AdoptionPetPage: FC = () => {
  const [filters, setFilters] = useState({
    city: '',
    gender: '',
    country: '',
    address: '',
    category: '',
  })
  const [page, setPage] = useState(1)
  const [gender, setGender] = useState('')
  const [category, setCategory] = useState('')
  const { data, isLoading } = useGetPets({
    page,
    gender,
    category,
    adopted: false,
  })

  const handeResetFilters = () => {
    setGender('')
    setCategory('')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeLocation = (result: any) => {
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
          <BaseButton
            style="secondary"
            text="Reset filters"
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
        <GoogleAutocomplete setLocation={handleChangeLocation} />
      </div>
      <PetList pets={data?.pets} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage} take={10} total={data?.total} />
    </div>
  )
}
