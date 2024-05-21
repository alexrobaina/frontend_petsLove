import React from 'react'
import { useTranslation } from 'react-i18next'

import { IconSearch } from '../../../../assets/icons'
import { BaseButton } from '../../../../components'
import { BaseButtonGroups } from '../../../../components/common/BaseButtonGroups'
import { BaseInput } from '../../../../components/common/BaseInput'

interface UserPetFiltersProps {
  gender: string
  category: string
  isAdopted: string
  searchByName: string
  resetFiler: () => void
  setPetOption: (value: string) => void
  setSearchByName: (value: string) => void
  setGenderOption: (value: string) => void
  setAdoptionStatus: (value: string) => void
}

const UserPetFilters: React.FC<UserPetFiltersProps> = ({
  gender,
  category,
  isAdopted,
  resetFiler,
  setPetOption,
  searchByName,
  setSearchByName,
  setGenderOption,
  setAdoptionStatus,
}) => {
  const { t } = useTranslation(['common'])

  const petCategories = [
    { name: 'dogs', path: 'dog' },
    { name: 'cats', path: 'cat' },
    { name: 'birds', path: 'bird' },
    { name: 'rabbits', path: 'rabbit' },
    { name: 'exotics', path: 'exotic' },
  ]

  const genderOptions = [
    { name: 'males', path: 'male' },
    { name: 'females', path: 'female' },
  ]

  const adoptionOption = [
    { name: 'adopted', path: 'adopted' },
    { name: 'inAdoption', path: 'inAdoption' },
  ]

  return (
    <>
      <div className="mt-5 mb-3 flex-col md:flex-row justify-between">
        <h2 className="text-lg md:text-lg font-semibold">
          {t('common:myPets')}
        </h2>
        <div className="flex gap-4 h-9 mt-4 md:mt-4 flex-col md:flex-row">
          <BaseButton
            size="small"
            type="button"
            style="secondary"
            onClick={resetFiler}
            text={t('common:resetFilters')}
          />
          <BaseButtonGroups
            group={petCategories}
            buttonSelected={category}
            handleSelectButtonGroup={setPetOption}
          />
          <BaseButtonGroups
            group={genderOptions}
            buttonSelected={gender}
            handleSelectButtonGroup={setGenderOption}
          />
          <BaseButtonGroups
            group={adoptionOption}
            buttonSelected={isAdopted}
            handleSelectButtonGroup={setAdoptionStatus}
          />
        </div>
      </div>
      <div className="my-5 md:mt-0 mt-42 ">
        <BaseInput
          type="text"
          value={searchByName}
          iconLeft={<IconSearch />}
          label={t('common:searchPets')}
          placeholder={t('common:searchByName')}
          handleChange={(e) => setSearchByName(e.target.value.toLowerCase())}
        />
      </div>
    </>
  )
}

export default UserPetFilters
