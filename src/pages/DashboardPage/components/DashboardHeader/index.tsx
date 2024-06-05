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
  petAnalytics: {
    totalPets: number
    adoptedPets: number
    petsInAdoption: number
  }
  setGender: (isAdopted: string) => void
  setCategory: (category: string) => void
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
  petAnalytics,
}) => {
  const { t } = useTranslation(['dashboard', 'common'])

  return (
    <header className="flex lg:flex-col xl:flex-col md:justify-between flex-col gap-5">
      <div className="flex lg:flex-row xl:flex-row md:justify-between flex-col gap-5">
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
      </div>

      <div className="flex flex-col gap-5 mt-10">
        {petAnalytics && (
          <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-5 ">
            <div className="flex flex-col gap-1 w-full sm:w-[172px] justify-center items-center bg-primary-100 rounded-md p-4">
              <span className="text-sm  text-primary-800">
                {t('common:totalPets')}
              </span>
              <span className="text-lg font-bold text-gray-800">
                {petAnalytics.totalPets}
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-[172px] justify-center items-center bg-primary-100 rounded-md p-4">
              <span className="text-sm text-primary-800">
                {t('common:adoptedPets')}
              </span>
              <span className="text-lg font-bold text-gray-800">
                {petAnalytics.adoptedPets}
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-[172px] justify-center items-center bg-primary-100 rounded-md p-4">
              <span className="text-sm text-primary-800">
                {t('common:petsInAdoption')}
              </span>
              <span className="text-lg font-bold text-gray-800">
                {petAnalytics.petsInAdoption}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
