import { useTranslation } from 'react-i18next'

import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseButtonGroups } from '../../../../components/common/BaseButtonGroups'
import { Header } from '../../../../components/common/Header'
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
  const { t } = useTranslation(['dashboard', 'common'])

  return (
    <header className="flex lg:flex-row xl:flex-row md:justify-between flex-col gap-5">
      <Header title={t('common:dashboard')} />
      <div className="flex gap-5 flex-col lg:flex-row md:justify-between xl:items-center">
        <div className="z-10">
          <BaseButton
            size="small"
            type="button"
            style="secondary"
            onClick={resetFilters}
            text={t('common:resetFilters')}
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
