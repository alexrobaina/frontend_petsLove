import { BaseButton } from '../../../../components/BaseButton'
import { BaseButtonGroups } from '../../../../components/BaseButtonGroups'
import { Header } from '../../../../components/Header'
import {
  IS_ADOPTED_OPTIONS,
  PET_CATEGORY_OPTIONS,
  PET_GENDER_OPTIONS,
} from '../../../constants/constants'

interface Props {
  gender: string
  category: string
  isAdopted: string
  resetFilters: () => void
  setCategory: (category: string) => void
  setGender: (isAdopted: string) => void
  setIsAdopted: (isAdopted: string) => void
}

export const DashboardHeader: React.FC<Props> = ({
  gender,
  category,
  setGender,
  isAdopted,
  setCategory,
  setIsAdopted,
  resetFilters,
}) => {
  return (
    <header className="flex md:flex-row md:justify-between flex-col gap-5">
      <Header title="Dashboard" />
      <div className="flex gap-5 flex-col md:flex-row">
        <div className="z-10">
          <BaseButton
            size="small"
            type="button"
            style="secondary"
            text="Reset filters"
            onClick={resetFilters}
          />
        </div>
        <BaseButtonGroups
          buttonSelected={category}
          group={PET_CATEGORY_OPTIONS}
          handleSelectButtonGroup={setCategory}
        />
        <BaseButtonGroups
          buttonSelected={gender}
          group={PET_GENDER_OPTIONS}
          handleSelectButtonGroup={setGender}
        />
        <BaseButtonGroups
          group={IS_ADOPTED_OPTIONS}
          buttonSelected={isAdopted}
          handleSelectButtonGroup={setIsAdopted}
        />
      </div>
    </header>
  )
}
